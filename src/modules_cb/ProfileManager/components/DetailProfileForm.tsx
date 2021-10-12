import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getActivityLogs, showFormDetail} from "../redux/actions";
import {Avatar, Button, Icon, Pagination, Select, Timeline} from "antd";
import React, {useEffect, useState} from "react";
import {DetailCV} from "../types";
import moment from "moment";
import env from "../../../configs/env";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
  detail: state.profileManager.detail,
  activityLogs: state.profileManager.getActivity,
  booking: state.profileManager.getBooking,
  account: state.accountManager.list,
})

const connector = connect(mapStateToProps,
  {
    showFormDetail,
    getActivityLogs
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface DetailProfileFormProps extends ReduxProps {
}

function DetailProfileForm(props: DetailProfileFormProps) {
  console.log("props:", props)
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [activeLogs, setActiveLogs] = useState({
    params: '',
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0
  })
  const [icon, setIcon] = useState([
    {
      type: "select",
      iconType: 'eye',
      twoToneColor: '#ffee00'
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
  ])
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


  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  const dateFormat = 'DD/MM/YYYY';

  function onChange() {

  }

  function handleChangeActivityLogs(page: any) {
    setActiveLogs({
      ...activeLogs,
      current: page,
      minIndex: (page - 1) * size,
      maxIndex: page * size,
    });
  }

  return (
    <div className="detail-container">
      <div className="detail-title">
        <div className="detail-title__left">
          <h1>{props.detail.result?.fullName}</h1>
          <span>Java Candidate Profile</span>
        </div>

        <div className="detail-title__right">
          <Button size="small" className="ant-btn ant-btn-sm">
            Tạo ứng tuyển
          </Button>
          <Button size="small" className="ant-btn mr-1 ant-btn-sm">
            <Icon type="edit"/>
          </Button>
          <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                  onClick={handeClose}
          >
            <Icon type="close"/>
          </Button>
        </div>
      </div>

      <div className="detail-paragraph-1">
        <Avatar src={require('src/assets/images/profile.png')} size={100} style={{width: "115px"}}/>
        <div className="detail-paragraph-1__name">
          <h2>{props.detail.result?.fullName}</h2>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <span>0.0/5</span>
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
        </div>
        <div className="detail-paragraph-3__content">
          <div>
            <Icon type="environment" className="mr-2"/>
            <span>Địa chỉ phỏng vấn: {props.booking.result?.address}</span>
          </div>

          <div>
            <Icon type="team" className="mr-2"/>
            <span>Hội đồng tuyển dụng:</span>
            <ul>
              {props.account.rows?.filter((item: any) => props.booking.result?.interviewer.includes(item.username))
                .map((item: any, index: any) => {
                return <li key={index}>
                  {item.fullName}
                </li>
              })}
            </ul>
          </div>

          <div>
            <Icon type="calendar" className="mr-2"/>
            <span>Thời gian phỏng vấn: {props.booking.result ? moment(unixTimeToDate(props.booking.result?.time)).format('HH:mm DD/MM/YYYY') : ''} </span>
          </div>

          <h1>Trạng thái phỏng vấn</h1>
          <div>
            <Icon type="audit" className="mr-2"/>
            <span>Nội dung phỏng vấn: {props.booking.result?.content}</span>
          </div>

          <div>
            <Icon type="question-circle" className="mr-2"/>
            <span>Câu hỏi: {props.booking.result?.question}</span>
          </div>

          <div>
            <Icon type="edit" className="mr-2"/>
            <span>Nhận xét: {props.booking.result?.comments}</span>
          </div>

          <div>
            <Icon type="like" className="mr-2"/>
            <span>Đánh giá: {props.booking.result?.evaluation}</span>
          </div>

          <div>
            <Icon type="check-circle" className="mr-2"/>
            <span>Lý do: {props.booking.result?.reason}</span>
          </div>


        </div>
      </div>

      <div className="detail-paragraph-4">
        <div className="detail-paragraph-4__title">
          <h1>Resumes & CVS</h1>
        </div>

        <div className="detail-paragraph-4__content">
          <iframe
            src="https://www.afirm-group.com/viet/ChemicalGuidanceVN.pdf"
            title="CV"
            width="100%"
            height="700px"
          >
          </iframe>
        </div>

      </div>

      <div className="detail-paragraph-5">
        <div className="detail-paragraph-5__title">
          <h1>Activity logs</h1>
        </div>

        <div className='detail-paragraph-5__content'>
          <Timeline style={{padding: '15px'}}>
            {activeLogs.data?.reverse().map((item: any, index: any) => {
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
  )
}

export default connector(DetailProfileForm);

