import React, {useEffect, useState} from "react";
import {Avatar, Button, Icon, Input, Popover} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {countBookingNumber,} from "../../ProfileManager/redux/actions";
import {AiOutlineCalendar, FiChevronDown, GrNext, GrPrevious} from "react-icons/all";
import moment from 'moment';
import ScheduleInterview from "../components/ScheduleInterview";
import DateBox from "devextreme-react/date-box";
import DetailScheduleInterview from "../components/DetailScheduleInterview";
import {getAllSchedule} from "../redux/actions";
import {DataShowSchedule} from "../types";

const {Search} = Input;

const mapStateToProps = (state: RootState) => ({
  schedule: state.scheduleManager.getSchedule,
})


const connector = connect(mapStateToProps, {
  countBookingNumber,
  getAllSchedule
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function ScheduleManagerPages(props: IProps) {
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';

  useEffect(() => {
    document.title = "Lịch";
    props.countBookingNumber();
    props.getAllSchedule();
  }, []);

  useEffect(()=>{},[])

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
  const [idDetail, setIdDetail] = useState<string>('');

  function handleDateChange() {
    console.log("haha")
  }

  function handlePopupScheduleInterview() {
    setVisible(true)
  }

  function handlePopupScheduleInterviewDetail(values: DataShowSchedule) {
    console.log(values)
    setIdDetail(values.id)
    setVisibleDetail(true)
  }

  function handleClosePopup() {
    setVisible(false)
  }

  function handleClosePopupDetail() {
    setVisibleDetail(false)
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
  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  const outObject = props.schedule?.result?.reduce((acc: any, curr: any) => {
    const queryResult = acc.find((qr: any) => {
      const a: any = moment(qr.date);
      const b: any = moment(curr.date);
      const qrConvert: any = new Date(a)
      const currConvert: any = new Date(b)
      qrConvert.setHours(0, 0, 0);
      currConvert.setHours(0, 0, 0);
      const diffTime = Math.abs((qrConvert - currConvert) / (1000 * 60 * 60 * 24));
      return diffTime === 0;
    });
    if (queryResult !== undefined) {
      queryResult.data.push(curr)
    } else {
      let newQR = {date: moment(curr.date).format("LL"), data: [curr]};
      acc.push(newQR);
    }
    return acc;
  }, []);
  console.log("outObject:", outObject)
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
        {outObject?.length > 0 ?
          outObject?.map((item: any, index: any) => {
            return <div className="c-schedule-content" key={item.date}>
              <div className="c-schedule-content__head">Hôm nay - {item.date}</div>
              {item.data?.map((itemChild: any, index1: any) => {
                return <div className="c-item " key={index1}>
                  <div className="c-time-flex">
                    {moment(itemChild.date).format(timeFormat)} - {moment(itemChild.interviewTime).format(timeFormat)}
                  </div>
                  <div className={index1 === item.data?.length - 1 ? "c-main-content" : "c-main-content border-bottom"}>
                    <Avatar size={25} style={{backgroundColor: itemChild.avatarColor}}>
                      {getInitials(itemChild.fullName)}
                    </Avatar>
                    <div className="c-main-content__wrap-main">
                      <div className="main-1">
                        <a className="main-1__candidate-name"
                           onClick={() => handlePopupScheduleInterviewDetail(itemChild)}>{itemChild.fullName}</a>
                        <div className="main-1__green-dot"></div>
                        <div className="main-1__job-description">{itemChild.recruitmentName}</div>
                      </div>
                      <div className="main-2">
                        <div className="ellipsis">{itemChild.type}</div>
                      </div>
                    </div>
                  </div>
                </div>
              })}

            </div>
          })

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
      <DetailScheduleInterview idDetail={idDetail} dataDetail={props.schedule.result} visible={visibleDetail}
                               handleClosePopupDetail={handleClosePopupDetail}/>
    </>
  );
}

export default connector(ScheduleManagerPages);
