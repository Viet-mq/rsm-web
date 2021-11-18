import React, {useEffect, useState} from "react";
import {Avatar, Button, Icon, Input, Popover} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  countBookingNumber,
  showFormBooking,
  showFormCreate,
  showFormUpdate,
  showFormUploadCV,
  showFormUploadListCV,
} from "../../ProfileManager/redux/actions";
import {AiOutlineCalendar, FiChevronDown, GrNext, GrPrevious} from "react-icons/all";
import moment from 'moment';
import ScheduleInterview from "../ScheduleInterview";
import DateBox from "devextreme-react/date-box";
import DetailScheduleInterview from "../DetailScheduleInterview";

const {Search} = Input;

const mapStateToProps = ({
                           profileManager: {
                             showForm,
                             list,
                             create,
                             deleteProfile,
                             update,
                             uploadCV,
                             showFormUpload,
                             getBooking,
                             createBooking,
                             updateBooking,
                             updateDetail,
                             uploadListCV,

                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteProfile,
  update,
  uploadCV,
  showFormUpload,
  getBooking,
  createBooking,
  updateBooking,
  updateDetail,
  uploadListCV
})
const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUpdate,
  showFormUploadCV,
  showFormBooking,
  showFormUploadListCV,
  countBookingNumber
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function ScheduleManagerPages(props: IProps) {
  const dateFormat = 'DD/MM/YYYY';
  useEffect(() => {
    document.title = "Lịch";
    props.countBookingNumber();
  }, []);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  const handleUploadListCV = (e: any) => {
    e.stopPropagation();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadListCV(true);
  }
  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  const handleVisibleChange = (visible: any) => {
    console.log(visible)
    setVisiblePopover(visible);
  };

  const content = (
    <ul style={{width: 120}} className="popup-popover">
      <li>
        <a>Tôi tham gia</a>
      </li>
      <li>
        <a>Tôi tạo</a>
      </li>
      <li>
        <a>Tất cả</a>
      </li>

    </ul>
  );

  const [visible, setVisible] = useState(false)
  const [visibleDetail, setVisibleDetail] = useState(false)

  function handleDateChange() {
    console.log("haha")
  }

  function handlePopupScheduleInterview() {
    setVisible(true)
  }
  function handlePopupScheduleInterviewDetail() {
    setVisibleDetail(true)
  }

  function handleClosePopup() {
    setVisible(false)
  }
  function handleClosePopupDetail() {
    setVisibleDetail(false)
  }

  const state: boolean = true;

  const getInitials = (name: string) => {
    let initials: any = name.split(' ');

    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }

    return initials.toUpperCase();
  }
  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  return (
    <>
      <div className="c-schedule-container">
        <div className="c-schedule-header">
          <div className="c-schedule-header__align-left">
            <Button style={{fontWeight: 500}}>
              <AiOutlineCalendar className="mr-1" size={20}/>
              Tuần này
            </Button>
            <Button>
              <GrPrevious/>
            </Button>
            <Button>
              <GrNext/>
            </Button>
            <div style={{marginRight: 30}} className="align">
              <DateBox defaultValue={moment()} displayFormat="dd/MM/yyyy"
                       type="date"/>

              {/*<AiTwotoneCalendar size={20}/>*/}
            </div>

            <Popover
              onVisibleChange={handleVisibleChange}
              visible={visiblePopover}
              className="header-user-info align"
              placement="bottomRight"
              content={content}
              trigger="click">

              <span style={{fontWeight: 600}}>Tôi tham gia</span>
              <FiChevronDown style={{marginLeft: 10}}/>
            </Popover>
          </div>

          <div className="c-schedule-header__align-right align">
            <Search
              placeholder="Tìm kiếm lịch theo tên ứng viên, tin tuyển dụng"
              onSearch={value => console.log(value)}
              style={{width: 340}}
            />
            <Button type="primary"
                    onClick={handlePopupScheduleInterview}
                    style={{marginLeft: 24}}>
              <Icon type="plus" style={{fontSize: "125%"}}/>
              Đặt lịch
            </Button>
          </div>
        </div>
        {state ?
          <div className="c-schedule-content">

            <div className="c-schedule-content__head">Hôm nay - 12 Tháng 11,2021</div>
            <div className="c-item ">
              <div className="c-time-flex">
                10:30 - 10:40
              </div>
              <div className="c-main-content border-bottom">
                <Avatar size={25} style={{backgroundColor: ''}}>
                  {getInitials("Hồ Đức Duy")}
                </Avatar>
                <div className="c-main-content__wrap-main">
                  <div className="main-1">
                    <a className="main-1__candidate-name" onClick={handlePopupScheduleInterviewDetail}>Hồ Đức Duy</a>
                    <div className="main-1__green-dot"></div>
                    <div className="main-1__job-description">Business Analysis</div>
                  </div>
                  <div className="main-2">
                    <div className="ellipsis">Phỏng vấn trực tiếp</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-item">
              <div className="c-time-flex">
                10:30 - 10:40
              </div>
              <div className="c-main-content">
                <Avatar size={25} style={{backgroundColor: setColor()}}>
                  {getInitials("Hồ Đức Duy")}
                </Avatar>
                <div className="c-main-content__wrap-main">
                  <div className="main-1">
                    <a className="main-1__candidate-name">Hồ Đức Duy</a>
                    <div className="main-1__green-dot"></div>
                    <div className="main-1__job-description">Business Analysis</div>
                  </div>
                  <div className="main-2">
                    <div className="ellipsis">Phỏng vấn trực tiếp</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          :
          <div className="c-schedule-content-nodata">
            <div className="image-nodata-schedule">
              <img src={require('src/assets/images/Empty.png')}/>
            </div>
            <div className="text-1">
              Chưa có lịch phỏng vấn
            </div>
            <div className="text-2">
              Đặt lịch để quản lý thời gian thi tuyển phỏng vấn của ứng viên
            </div>
            <Button type="primary" style={{marginLeft: 24}}
                    onClick={handlePopupScheduleInterview}
            >
              <Icon type="plus" style={{fontSize: "125%"}}/>
              Đặt lịch
            </Button>
          </div>

        }

      </div>
      <ScheduleInterview visible={visible} handlePopupScheduleInterview={handlePopupScheduleInterview}
                         handleClosePopup={handleClosePopup}/>
      <DetailScheduleInterview  visible={visibleDetail} handleClosePopupDetail={handleClosePopupDetail}/>
    </>

  );

}

export default connector(ScheduleManagerPages);
