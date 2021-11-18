import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  createNote,
  deleteNote,
  getActivityLogs,
  getBooking,
  getDetailProfile,
  getListNote,
  showFormBooking,
  showFormDetail,
  showFormUpdate,
  showFormUpdateDetail,
  showFormUploadAvatar,
  showFormUploadCV,
  updateNote
} from "../redux/actions";
import {showFormCreateNote, showFormUpdateNote} from "../../ProfileManager/redux/actions/note/showNote";

import {Avatar, Button, Icon, Pagination, Popconfirm, Popover, Table, Tag, Timeline, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {DataShowBooking, DeleteNoteRequest, DetailCV, NoteEntity} from "../types";
import moment from "moment";
import {ColumnProps} from "antd/lib/table";
import {emptyText} from "../../../configs/locales";
import Loading from "../../../components/Loading";
import CreateNoteForm from "./CreateNoteForm";
import UpdateNoteForm from "./UpdateNoteForm";
import {RiFullscreenExitLine, RiFullscreenLine} from "react-icons/all";
import StarRatings from 'react-star-ratings';
import UploadAvatarForm from "./UploadAvatarForm";

const mapStateToProps = (state: RootState) => ({
  showDetail: state.profileManager.showForm,
  detail: state.profileManager.detail,
  activityLogs: state.profileManager.getActivity,
  booking: state.profileManager.getBooking,
  account: state.accountManager.list,
  note: state.profileManager.getListNote,
  createNote: state.profileManager.createNote,
  updateNote: state.profileManager.updateNote,
  skill:state.skillManager.list,
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
    showFormUploadAvatar
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface DetailProfileFormProps extends ReduxProps {
}

function DetailProfileForm(props: DetailProfileFormProps) {
  const [page, setPage] = useState(1);
  const size = 10;
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

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  const handleUploadAvatar = (e: any) => {
    e.preventDefault();
    setVisiblePopover(false)
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadAvatar(true, props.detail.result?.id);
  }

  const handleDeleteAvatar = (event: any) => {
    event.stopPropagation();
    setVisiblePopover(false)
    // let req: DeleteTalentPoolRequest = {
    //   id: talentPool.id
    // }
    // props.deleteTalentPool(req);
  }

  const content = (
    <ul style={{width: 165}} className="popup-popover">
      <li>
        <a onClick={handleUploadAvatar}>Cập nhật ảnh đại diện</a>
      </li>

      <li>
        <a onClick={handleDeleteAvatar} style={{color: "red"}}>Xóa ảnh đại diện</a>
      </li>

    </ul>
  );

  const handleVisibleChange = (visible: any) => {
    console.log(visible)
    setVisiblePopover(visible);
  };


  const handleDeleteNote = (event: any, entity: NoteEntity) => {
    event.stopPropagation();
    let req: DeleteNoteRequest = {
      id: entity.id
    }
    props.deleteNote({id: req.id});

  }

  const handleEditNote = (event: any, entity: NoteEntity) => {
    event.stopPropagation();
    // console.log("handleEditNote:",entity)
    props.showFormUpdateNote(true, entity);
  }

  function handleCreateNote(event: any) {
    event.stopPropagation();
    props.showFormCreateNote(true, props.detail.result?.id);
  }

  const columns: ColumnProps<NoteEntity>[] = [
    {
      title: "Người phỏng vấn",
      dataIndex: "fullName",
      width: 100,
      key: '1'
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
      width: 100,
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
      title: "Thời gian sửa",
      dataIndex: "updateAt",
      width: 100,
      key: "updateAt",
      render: (value: string) => {
        return moment(unixTimeToDate(parseInt(value, 10))).format('DD/MM/YYYY HH:mm');
      },
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
      width: 90,
      fixed: 'right',
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
      params: props.activityLogs.params,
      data: props.activityLogs.rows,
      totalPage: props.activityLogs.total,
      current: page,
      minIndex: 0,
      maxIndex: size
    })
  }, [props.activityLogs.total])
  const handeClose = (e: any) => {
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
    props.showFormUpdateDetail(true, props.detail.result);
  }

  const onBtnUploadCV = (e: any) => {
    e.stopPropagation();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadCV(true, props.detail.result?.id);
  }

  const onBtnUpdateBooking = (event: any) => {
    event.stopPropagation();
    let req: DataShowBooking = {
      id: props.detail.result?.id,
      fullName: props.detail.result?.fullName
    }
    props.showFormBooking(true, req);
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

  useEffect(() => {
    if (props.showDetail.id_detail) {
      props.getDetailProfile({idProfile: props.showDetail.id_detail});
      props.getActivityLogs({idProfile: props.showDetail.id_detail});
      props.getBooking({idProfile: props.showDetail.id_detail});
      props.getListNote({idProfile: props.showDetail.id_detail})
    }
  }, [props.showDetail.id_detail])

  return (
    <>
      <div className="detail-container">
        <div className="detail-title">
          <div className="detail-title__left">
            <h1>{props.detail.result?.fullName}</h1>
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
                    onClick={handeClose}
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
              src={props.detail.result?.image ? props.detail.result?.image : "#"}
              style={{backgroundColor: props.detail.result?.avatarColor, fontSize: 50, fontWeight: 600}}>
              {props.detail.result?.image ? null : getInitials(props.detail.result?.fullName)}
            </Avatar>

          </Popover>
          <div className="detail-paragraph-1__name">

            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h2>{props.detail.result?.fullName}</h2>
              {
                props.detail.result?.statusCVName === "APPLY" ?
                  <Tag color="#cfcfcf" style={{height: 22, fontSize: 17}}>{props.detail.result?.statusCVName}</Tag> :
                  props.detail.result?.statusCVName === "INTERVIEW" ?
                    <Tag color="#339cff" style={{height: 22, fontSize: 17}}>{props.detail.result?.statusCVName}</Tag> :
                    props.detail.result?.statusCVName === "OFFER" ? <Tag color="#fac000" style={{
                        height: 22,
                        fontSize: 17
                      }}>{props.detail.result?.statusCVName}</Tag> :
                      props.detail.result?.statusCVName === "HIRED" ? <Tag color="#87d068" style={{
                          height: 22,
                          fontSize: 17
                        }}>{props.detail.result?.statusCVName}</Tag> :
                        props.detail.result?.statusCVName === "REJECT" ? <Tag color="#fa0000" style={{
                            height: 22,
                            fontSize: 17
                          }}>{props.detail.result?.statusCVName}</Tag> :
                          props.detail.result?.statusCVName === "TEST" ? <Tag color="#8900fa" style={{
                            height: 22,
                            fontSize: 17
                          }}>{props.detail.result?.statusCVName}</Tag> : null
              }

            </div>
            <div>{props.detail.result?.skill?.map((item:any,index:any)=>{
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
            <p>{props.detail.result?.phoneNumber}</p>
            <p>{props.detail.result?.email}</p>
          </div>
        </div>

        <div className="detail-paragraph-2">
          <div className="detail-paragraph-2__title">
            <h1>Thông tin hồ sơ</h1>
          </div>

          <div className="detail-paragraph-2__content">
            <Icon type="mail" className='mr-1'/>
            <span>{props.detail.result?.email}</span><br/>
            <Icon type="phone" className='mr-1'/>
            <span>{props.detail.result?.phoneNumber}</span><br/>
            <Icon type="contacts" className='mr-1'/>
            <span>{props.detail.result?.hometown || "Không có địa chỉ"}</span><br/>
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
            <div className="detail-paragraph-3__title--button">
              <Button size="small" className="ant-btn mr-1 ant-btn-sm"
                      onClick={event => onBtnUpdateBooking(event)}
              >
                <Icon type="edit"/>
              </Button>
            </div>
          </div>
          <div className="detail-paragraph-3__content">
            <div>
              <Icon type="environment" className="mr-2"/>
              <span>Địa chỉ phỏng vấn: {props.booking.result?.interviewAddress}</span>
            </div>

            <div>
              <Icon type="team" className="mr-2"/>
              <span>Hội đồng tuyển dụng:</span>
              <ul>
                {props.account.rows?.filter((item: any) => props.booking.result?.interviewers.includes(item.username))
                  .map((item: any, index: any) => {
                    return <li key={index}>
                      {item.fullName}
                    </li>
                  })}
              </ul>
            </div>

            <div>
              <Icon type="calendar" className="mr-2"/>
              <span>Thời gian phỏng vấn: {props.booking.result ? moment(unixTimeToDate(props.booking.result?.date)).format('HH:mm DD/MM/YYYY') : ''} </span>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h1>Trạng thái phỏng vấn</h1>
              <Button size="small" className="ant-btn mr-1 ant-btn-sm"
                      style={{margin: "auto"}}
                      onClick={event => handleCreateNote(event)}>
                <Icon type="plus"/> Tạo đánh giá
              </Button>
            </div>

            <div>
              <Icon type="audit" className="mr-2"/>
              {/*<span>Nội dung phỏng vấn: {props.booking.result?.content}</span>*/}
            </div>

            <div>
              <Icon type="question-circle" className="mr-2"/>
              {/*<span>Câu hỏi: {props.booking.result?.question}</span>*/}
            </div>

            <Table
              scroll={{x: 1000}}
              className="custom-table -webkit-scrollbar"
              dataSource={props.note.result?.rows}
              columns={columns}
              rowKey="id"
              locale={{emptyText: emptyText}}
              pagination={{
                current: page,
                pageSize: size,
                total: props.note.result?.total,
                onChange: value => setPage(value),
                showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
              }}

            />

            <div>
              <Icon type="check-circle" className="mr-2"/>
              {/*<span>Lý do: {props.booking.result?.reason}</span>*/}
            </div>


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
            {props.detail.result?.urlCV ? <iframe
                src={props.detail.result?.urlCV}
                title="CV"
                width="100%"
                height="700px"
              >
              </iframe>
              : null}

          </div>

        </div>

        <div className="detail-paragraph-5">
          <div className="detail-paragraph-5__title">
            <h1>Activity logs</h1>
          </div>

          <div className='detail-paragraph-5__content'>
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
                    {item.fullName} {item.action} at {moment(unixTimeToDate(item.time)).format('HH:mm DD/MM/YYYY')}
                  </span>
                  </Timeline.Item>
              })}

            </Timeline>

            <Pagination showQuickJumper
                        current={activeLogs.current}
                        total={activeLogs.totalPage}
                        pageSize={size}
                        showTotal={(total, range) => `Đang xem ${range[0]}- ${range[1]} trong tổng số ${total} mục`}
                        onChange={handleChangeActivityLogs}
                        className="pagination"
            ></Pagination>
          </div>
        </div>

      </div>

      <CreateNoteForm/>
      <UpdateNoteForm/>
      <UploadAvatarForm/>

      {props.createNote.loading ||
      props.updateNote.loading ||
      props.detail.loading
        ? <Loading/> : null}

    </>
  )
}

export default connector(DetailProfileForm);

