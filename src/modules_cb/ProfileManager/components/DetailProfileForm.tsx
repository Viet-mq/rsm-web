import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  createNote,
  deleteNote,
  getActivityLogs,
  getBooking,
  getDetailProfile,
  getListNote,
  showAddToTalentPoolForm,
  showChangeProcessForm,
  showChangeRecruitmentForm,
  showFormBooking,
  showFormCreateNote,
  showFormDetail,
  showFormReasonReject,
  showFormUpdate,
  showFormUpdateDetail,
  showFormUpdateNote,
  showFormUploadAvatar,
  showFormUploadCV,
  updateNote
} from "../redux/actions";
import {
  Avatar,
  Badge,
  Button,
  Icon,
  Pagination,
  Popconfirm,
  Popover,
  Steps,
  Table,
  Tabs,
  Tag,
  Timeline,
  Tooltip
} from "antd";
import React, {useEffect, useState} from "react";
import {DataShowBooking, DeleteNoteRequest, DetailCV, NoteEntity, ProcessForm} from "../types";
import moment from "moment";
import {ColumnProps} from "antd/lib/table";
import {emptyText} from "../../../configs/locales";
import Loading from "../../../components/Loading";
import CreateNoteForm from "./CreateNoteForm";
import UpdateNoteForm from "./UpdateNoteForm";
import {
  BsThreeDotsVertical,
  FaLongArrowAltRight,
  MdOutlineSource,
  RiFullscreenExitLine,
  RiFullscreenLine
} from "react-icons/all";
import StarRatings from 'react-star-ratings';
import UploadAvatarForm from "./UploadAvatarForm";
import CreateReasonRejectForm from "./CreateRejectCandidateForm";
import {getListRecruitment} from "../../RecruitmentManager/redux/actions";
import ChangeProcessForm from "./ChangeProcessForm";
import ChangeRecruitmentForm from "./ChangeRecruitmentForm";
import AddToTalentPoolForm from "./AddToTalentPoolForm";
import UpdateDetailProfileForm from "./UpdateDetailProfileForm";

const {Step} = Steps;
const {TabPane} = Tabs;


const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  account: state.accountManager.list,
  skill: state.skillManager.list,
  recruitment: state.recruitmentManager.list
})

const connector = connect(mapStateToProps,
  {
    showFormDetail,
    getActivityLogs,
    showFormUpdate,
    showFormUpdateDetail,
    showFormUploadCV,
    showFormBooking,
    deleteNote,
    updateNote,
    createNote,
    showFormCreateNote,
    showFormUpdateNote,
    getDetailProfile,
    getBooking,
    getListNote,
    showFormUploadAvatar,
    showFormReasonReject,
    getListRecruitment,
    showChangeProcessForm,
    showChangeRecruitmentForm,
    showAddToTalentPoolForm
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface DetailProfileFormProps extends ReduxProps {
}

function DetailProfileForm(props: DetailProfileFormProps) {
  const [page, setPage] = useState(1);
  const [pageEmail, setPageEmail] = useState(1);
  const size = 10;
  const {
    showForm, detail, getActivity, getBooking, getListNote, createNote, updateNote, updateDetail, uploadAvatar, changeProcess,addToTalentPool
  } = props.profileManager;
  const [rate, setRate] = useState(2.4);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [activeLogs, setActiveLogs] = useState({
    params: '',
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0
  })
  const icon = [
    {
      type: "select",
      iconType: 'eye',
      twoToneColor: '#D7D704'
    },
    {
      type: "create",
      iconType: 'plus-circle',
      twoToneColor: '#00d62b'
    },
    {
      type: "update",
      iconType: 'edit',
      twoToneColor: '#0d89fc'

    },
    {
      type: "delete",
      iconType: 'delete',
      twoToneColor: '#ff3b3b'

    },
  ]
  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);
  const [popoverRecruitment, setPopoverRecruitment] = useState<boolean>(false);
  const content = (<ul style={{width: 165}} className="popup-popover">
    <li>
      <a onClick={handleUploadAvatar}>Cập nhật ảnh đại diện</a>
    </li>

    <li>
      <a onClick={handleDeleteAvatar} style={{color: "red"}}>Xóa ảnh đại diện</a>
    </li>

  </ul>);
  const contentMore = (<ul style={{width: 220}} className="popup-popover">
    <li>
      <a onClick={handleShowRecruitment}><Icon type="inbox" className="mr-1"/>Chuyển sang tin khác</a>
    </li>
    <li>
      <a onClick={handleShowTalentPools}><MdOutlineSource className="mr-1"/>Chuyển đến kho tiềm năng</a>
    </li>
  </ul>);
  const columns: ColumnProps<NoteEntity>[] = [
    {
      title: "Người phỏng vấn",
      dataIndex: "fullName",
      width: 110,
      key: 'fullName',
      render: (text: string, record: NoteEntity) => {
        return <div>
          <div>
          <span style={{color: "#B2B2B2"}}>
                {moment(unixTimeToDate(parseInt(record.updateAt, 10))).format('DD/MM/YYYY HH:mm')}</span>
          </div>

          <span style={{fontWeight: 500,}}>
                        {record.fullName}
          </span>
        </div>
      }
    },
    {
      title: "Nhận xét",
      dataIndex: "comment",
      width: 200,
      key: 2,
    },
    {
      title: "Đánh giá",
      dataIndex: "evaluation",
      width: 70,
      key: "evaluation",
    },
    {
      title: "Đính kèm",
      dataIndex: "fileName",
      width: 100,
      key: "fileName",
      render: (text: string, record: NoteEntity) => <a className="cv-overflow" href={record.url}
                                                       target="_blank">{record.fileName}</a>,

    },

    {
      title: "Người sửa",
      dataIndex: "updateBy",
      width: 90,
      key: "updateBy",
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 60,
      align: "center",
      // fixed: 'right',
      render: (_text: string, record: NoteEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Profile này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDeleteNote(event, record)}
            >
              <Tooltip placement="top" title="Xóa">
                <Button
                  size="small"
                  className="ant-btn ml-1 mr-1 ant-btn-sm"
                  onClick={event => {
                    event.stopPropagation();
                  }}
                >
                  <Icon type="delete" theme="filled"/>
                </Button>
              </Tooltip>

            </Popconfirm>

            <Tooltip placement="top" title="Sửa">

              <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                      onClick={event => handleEditNote(event, record)}
              >
                <Icon type="edit"/>
              </Button>
            </Tooltip>

          </div>
        );
      },
    },

  ]

  useEffect(() => {
    setActiveLogs({
      params: getActivity.params,
      data: getActivity.rows,
      totalPage: getActivity.total,
      current: activeLogs.current,
      minIndex: 0,
      maxIndex: size
    })
  }, [getActivity])

  useEffect(() => {
    if (showForm.id_detail) {
      props.getDetailProfile({idProfile: showForm.id_detail});
      props.getBooking({idProfile: showForm.id_detail});
      props.getListNote({idProfile: showForm.id_detail})
      if (detail.result?.recruitmentId) props.getListRecruitment({id: detail.result?.recruitmentId})
    }
  }, [showForm.id_detail])

  useEffect(() => {
    if (showForm.id_detail) {
      props.getActivityLogs({idProfile: showForm.id_detail, page: activeLogs.current, size: 10});
    }
  }, [showForm.id_detail, activeLogs.current])

  function handleUploadAvatar(e: any) {
    e.preventDefault();
    setVisiblePopover(false)
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadAvatar(true, detail.result?.id);
  }

  function handleDeleteAvatar(event: any) {
    event.stopPropagation();
    setVisiblePopover(false)
  }

  function handleShowRecruitment() {
    setPopoverRecruitment(false)
    props.showChangeRecruitmentForm(true, detail.result?.recruitmentId)
  }

  function handleShowTalentPools() {
    setPopoverRecruitment(false)
    props.showAddToTalentPoolForm(true)
  }

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  const handleClose = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    let req: DetailCV = {
      show_detail: false,
      general: 24,
      detail: 0
    }
    props.showFormDetail(req);
  }

  const handleFullScreen = (e: any) => {
    e.preventDefault();
    setIsFull(!isFull);
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    let req: DetailCV = isFull ?
      {
        show_detail: false,
        general: 12,
        detail: 12

      } : {
        show_detail: false,
        general: 0,
        detail: 24
      }
    props.showFormDetail(req);
  }

  const handleEditNote = (event: any, entity: NoteEntity) => {
    event.stopPropagation();
    props.showFormUpdateNote(true, entity);
  }

  function handleCreateNote(event: any) {
    event.stopPropagation();
    props.showFormCreateNote(true, detail.result?.id);
  }

  function handleChangeActivityLogs(page: any) {
    setActiveLogs({
      ...activeLogs,
      current: page,
      minIndex: (page - 1) * size,
      maxIndex: page * size,
    });
  }

  const onBtnUpdateDetail = (event: any) => {
    event.stopPropagation();
    props.showFormUpdateDetail(true, detail.result);
  }

  const onBtnUploadCV = (e: any) => {
    e.stopPropagation();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadCV(true, detail.result?.id);
  }

  const onBtnUpdateBooking = (event: any) => {
    event.stopPropagation();
    if (detail.result) {
      let req: DataShowBooking = {
        id: detail.result.id,
        fullName: detail.result.fullName,
        idRecruitment: detail.result.recruitmentId,
        username: detail.result.username
      }
      props.showFormBooking(true, req);
    }
  }

  const handleVisibleChange = (visible: any) => {
    setVisiblePopover(visible);
  };

  const handleDeleteNote = (event: any, entity: NoteEntity) => {
    event.stopPropagation();
    let req: DeleteNoteRequest = {
      id: entity.id
    }
    props.deleteNote({id: req.id});
  }

  const getInitials = (name: string) => {
    if (name) {
      let initials: any = name.split(' ');
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }
      return initials.toUpperCase();
    }
  }

  function handleShowReasonRejectForm(event: any) {
    event.stopPropagation();
    props.showFormReasonReject(true);
  }

  function handleChangeProcess() {
    let req: ProcessForm = (
      {
        idProfile: detail.result?.id,
        recruitmentId: detail.result?.recruitmentId,
        statusCVId: detail.result?.statusCVId,
        username:detail.result?.username
      }
    )
    props.showChangeProcessForm(true, req)
  }

  return (
    <>
      <div className="detail-container">
        <div className="detail-title">
          <div className="detail-title__left">
            <h1>{detail.result?.fullName}</h1>
            <span>Java Candidate Profile</span>
          </div>

          <div className="detail-title__right">

            <div style={{display: "flex", marginRight: "34px"}}>

              <Button size="small" className="ant-btn mr-1 ant-btn-sm"
                      onClick={event => handleFullScreen(event)}>
                {isFull ? <RiFullscreenExitLine className="mt-1"/> : <RiFullscreenLine className="mt-1"/>}
              </Button>
              <Button size="small" className="ant-btn mr-1 ant-btn-sm"
                      onClick={event => onBtnUpdateDetail(event)}>
                <Icon type="edit"/>
              </Button>
            </div>

            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm btn-delete"
                    onClick={handleClose}
            >
              <Icon type="close"/>
            </Button>

          </div>
        </div>

        <div className="detail-paragraph-1">
          <Popover
            onVisibleChange={handleVisibleChange}
            visible={visiblePopover}
            className="header-user-info"
            placement="bottom"
            content={content}
            trigger="click">

            <Avatar
              alt={"Ảnh đại diện"}
              size={100}
              src={detail.result?.image ? detail.result?.image : "#"}
              style={{backgroundColor: detail.result?.avatarColor, fontSize: 50, fontWeight: 600}}>
              {detail.result?.image ? null : getInitials(detail.result?.fullName)}
            </Avatar>

          </Popover>
          <div className="detail-paragraph-1__name">

            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h2>{detail.result?.fullName}</h2>
              {
                detail.result?.statusCVName === "APPLY" ?
                  <Tag color="#cfcfcf" style={{height: 22, fontSize: 17}}>{detail.result?.statusCVName}</Tag> :
                  detail.result?.statusCVName === "INTERVIEW" ?
                    <Tag color="#339cff" style={{height: 22, fontSize: 17}}>{detail.result?.statusCVName}</Tag> :
                    detail.result?.statusCVName === "OFFER" ? <Tag color="#fac000" style={{
                        height: 22,
                        fontSize: 17
                      }}>{detail.result?.statusCVName}</Tag> :
                      detail.result?.statusCVName === "HIRED" ? <Tag color="#87d068" style={{
                          height: 22,
                          fontSize: 17
                        }}>{detail.result?.statusCVName}</Tag> :
                        detail.result?.statusCVName === "REJECT" ? <Tag color="#fa0000" style={{
                            height: 22,
                            fontSize: 17
                          }}>{detail.result?.statusCVName}</Tag> :
                          detail.result?.statusCVName === "TEST" ? <Tag color="#8900fa" style={{
                            height: 22,
                            fontSize: 17
                          }}>{detail.result?.statusCVName}</Tag> : null
              }

            </div>
            <div>{detail.result?.skill?.map((item: any, index: any) => {
              return item.name
            })}</div>
            <StarRatings
              rating={rate}
              starRatedColor="#FEDE00"
              // changeRating={changeRating}
              numberOfStars={5}
              name='rating'
              starDimension="20px"
              starSpacing="0"
            />
            <span>{rate}/5</span>
            <span>0</span>
            <p>evaluations </p>
            <br/>
            <p>No title</p>
            <p>{detail.result?.phoneNumber}</p>
            <p>{detail.result?.email}</p>
          </div>
        </div>

        <div className="detail-paragraph-2">
          <div className="detail-paragraph-2__title">
            <h1>Thông tin hồ sơ</h1>
          </div>

          <div className="detail-paragraph-2__content">
            <Icon type="mail" className='mr-1'/>
            <span>{detail.result?.email}</span><br/>
            <Icon type="phone" className='mr-1'/>
            <span>{detail.result?.phoneNumber}</span><br/>
            <Icon type="contacts" className='mr-1'/>
            <span>{detail.result?.hometown || "Không có địa chỉ"}</span><br/>
            <h1>Social profiles</h1>
          </div>

          <div className="detail-paragraph-2__footer">
            <a>Tìm ứng viên trên facebook</a>
            <a>Tìm theo email</a>
          </div>
        </div>

        <div className="detail-paragraph-3">
          <div className="detail-paragraph-3__title">
            <h1>Lịch phỏng vấn</h1>
            {detail.result?.recruitmentId ? (<div className="detail-paragraph-3__title--button">
                <Button size="small" className="ant-btn mr-1 ant-btn-sm"
                        onClick={event => onBtnUpdateBooking(event)}
                >
                  <Icon type="calendar"/> Đặt/Sửa lịch
                </Button>
              </div>
            ) : null}
          </div>
          <div className="detail-paragraph-3__content">
            <div>
              <Icon type="environment" className="mr-2"/>
              <span>Địa chỉ phỏng vấn: {getBooking.result?.interviewAddressName}</span>
            </div>

            <div>
              <Icon type="team" className="mr-2"/>
              <span>Hội đồng tuyển dụng:</span>
              <ul>
                {props.account.rows?.filter((item: any) => getBooking.result?.interviewers?.map((item: any) => item.username).includes(item.username))
                  .map((item: any, index: any) => {
                    return <li key={index}>
                      {item.fullName}
                    </li>
                  })}
              </ul>
            </div>

            <div>
              <Icon type="calendar" className="mr-2"/>
              <span>Thời gian phỏng vấn: {getBooking.result ? moment(unixTimeToDate(getBooking.result?.date)).format('HH:mm DD/MM/YYYY') : ''} </span>
            </div>

            <div className='apply-position-box'>
              {detail.result?.recruitmentId ? (
                <>
                  <div className="apply-position-title font-15-bold-500"><Badge
                    color="green"/>{detail.result?.recruitmentName}</div>
                  <div className="apply-option flex-items-center">

                    <div className="apply-step">
                      <Steps
                        current={props.recruitment?.rows[0]?.interviewProcess.findIndex((item: any) => item.name === detail.result?.statusCVName)}
                        progressDot className="apply-step">
                        {
                          props.recruitment?.rows[0]?.interviewProcess?.map((item: any, index: any) => {
                            return <Step key={index} className="width-apply-position"/>
                          })
                        }
                      </Steps>
                      <div style={{textAlign: "center", width: 225}}>
                        {detail.result?.statusCVName}
                      </div>
                    </div>

                    <div className="flex-items-center">
                      <Button onClick={handleChangeProcess} className='mr-2'><FaLongArrowAltRight
                        style={{color: "#64d271", marginRight: 5}}/>
                        Chuyển vòng
                      </Button>

                      <Tooltip placement="top" title="Loại">
                        <Button className='mr-2' onClick={handleShowReasonRejectForm}><Icon type="stop" style={{
                          fontSize: "120%",
                          marginTop: 5
                        }}/></Button>
                      </Tooltip>

                      <Popover content={contentMore}
                               onVisibleChange={(visible: any) => setPopoverRecruitment(visible)}
                               visible={popoverRecruitment}
                               placement="bottomRight"
                               trigger="click">
                        <Button><BsThreeDotsVertical size={20} className="mt-1"/></Button>
                      </Popover>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2">
                    <div className="pb-2">Ứng viên chưa thuộc tin tuyển dụng nào</div>
                    <div>
                      <Button onClick={handleShowRecruitment} type={"primary"} size={"large"}><Icon type="inbox"/>
                        Chuyển ứng viên vào tin
                      </Button>
                    </div>
                  </div>
                </>
              )}

            </div>

            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h1>Đánh giá</h1>
              <Button size="small" className="ant-btn mr-1 ant-btn-sm"
                      style={{margin: "auto"}}
                      onClick={event => handleCreateNote(event)}>
                <Icon type="plus"/> Tạo đánh giá
              </Button>
            </div>

            <Table
              scroll={{x: 1000}}
              className="custom-table -webkit-scrollbar"
              dataSource={getListNote.result?.rows}
              columns={columns}
              rowKey="id"
              bordered
              locale={{emptyText: emptyText}}
              pagination={{
                current: page,
                pageSize: size,
                total: getListNote.result?.total,
                onChange: value => setPage(value),
                showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
              }}

            />

            {/*<div>*/}
            {/*  <Icon type="check-circle" className="mr-2"/>*/}
            {/*  <span>Lý do: {props.schedule.result?.reason}</span>*/}
            {/*</div>*/}


          </div>
        </div>

        <div className="detail-paragraph-4">
          <div className="detail-paragraph-4__title">
            <h1>Resumes & CVS</h1>
            <div className="detail-paragraph-4__title--button">

              <Button size="small" className="ant-btn mr-1 ant-btn-sm"
                      onClick={event => onBtnUploadCV(event)}
              >
                <Icon type="upload"/>
              </Button>
            </div>
          </div>

          <div className="detail-paragraph-4__content">
            {detail.result?.urlCV ? <iframe
                src={detail.result?.urlCV}
                title="CV"
                width="100%"
                height="700px"
              >
              </iframe>
              : null}

          </div>

        </div>

        <div className="detail-paragraph-5">
          <Tabs defaultActiveKey="1" className="tab-detail">
            <TabPane tab="ACTIVITY LOGS" className="tab-candidate-detail" key="1" style={{background: "#e8e8e8"}}>
              <div className='tab-detail-logs'>
                <Timeline style={{padding: '15px'}}>
                  {activeLogs.data?.map((item: any, index: any) => {
                    let iconType = icon.find((icon: any) => icon.type === item.type);
                    return index >= activeLogs.minIndex &&
                      index < activeLogs.maxIndex &&
                      <Timeline.Item key={index} dot={
                        <Icon type={iconType?.iconType} theme="twoTone" twoToneColor={iconType?.twoToneColor} style={{
                          borderRadius: '50%',
                          backgroundColor: iconType?.twoToneColor,
                          width: '40px',
                          height: '40px',
                          paddingTop: '10px',
                          fontSize: '20px',
                          // marginTop:'10px'
                        }}/>

                      }>
                <span
                  style={{textTransform: 'uppercase'}}>{moment(unixTimeToDate(item.time)).format('MMM DD, YYYY')}
                </span>
                        <br/>
                        <span>
                    {item.fullName} {item.action} lúc {moment(unixTimeToDate(item.time)).format('HH:mm DD/MM/YYYY')}
                  </span>
                      </Timeline.Item>
                  })}

                </Timeline>
                <Pagination
                  current={activeLogs.current}
                  total={activeLogs.totalPage}
                  pageSize={size}
                  showTotal={(total, range) => `Đang xem ${range[0]}- ${range[1]} trong tổng số ${total} mục`}
                  onChange={handleChangeActivityLogs}
                  className="pagination"
                />
              </div>

            </TabPane>

            <TabPane tab="EMAIL LOGS" key="2" style={{background: "#e8e8e8", marginLeft: 40}}>

            </TabPane>
          </Tabs>

        </div>

      </div>

      <CreateNoteForm/>
      <UpdateNoteForm/>
      <UploadAvatarForm/>
      <CreateReasonRejectForm/>
      <ChangeProcessForm/>
      <ChangeRecruitmentForm/>
      <AddToTalentPoolForm/>
      <UpdateDetailProfileForm/>

      {createNote.loading ||
      updateNote.loading ||
      detail.loading ||
      updateDetail.loading ||
      uploadAvatar.loading ||
      changeProcess.loading||
        addToTalentPool.loading
        ? <Loading/> : null}

    </>
  )
}

export default connector(DetailProfileForm);

