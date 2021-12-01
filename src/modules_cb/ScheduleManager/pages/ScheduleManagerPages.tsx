import React, {useEffect, useState} from "react";
import {Avatar, Button, Icon, Input, Select, Tooltip} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {countBookingNumber,} from "../../ProfileManager/redux/actions";
import {AiOutlineCalendar, GrNext, GrPrevious} from "react-icons/all";
import moment from 'moment';
import ScheduleInterview from "../components/ScheduleInterview";
import DetailScheduleInterview from "../components/DetailScheduleInterview";
import {getAllSchedule, showFormSchedule} from "../redux/actions";
import {DataShowSchedule, ScheduleEntity} from "../types";

const {Search} = Input;

const mapStateToProps = (state: RootState) => ({
  schedule: state.scheduleManager.getSchedule,
  showSchedule: state.scheduleManager.showSchedule
})


const connector = connect(mapStateToProps, {
  countBookingNumber,
  getAllSchedule,
  showFormSchedule,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function ScheduleManagerPages(props: IProps) {
  const {Option} = Select;
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const currWeek: string = 'currWeek';
  const preWeek: string = 'preWeek';
  const nextWeek: string = 'nextWeek';
  const [keySearch, setKeySearch] = useState<string>('')

  useEffect(() => {
    document.title = "Lịch";
    props.countBookingNumber();
    props.getAllSchedule();
  }, []);

  useEffect(() => {
    if (props.schedule?.result) {
      filterDatesByWeek(currWeek, props.schedule?.result);
    }
  }, [props.schedule?.result])

  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  const handleVisibleChange = (visible: any) => {
    console.log(visible)
    setVisiblePopover(visible);
  };


  const [visibleDetail, setVisibleDetail] = useState(false)
  const [idDetail, setIdDetail] = useState<string>('');

  function handlePopupScheduleInterview(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormSchedule(true);
  }

  function handlePopupScheduleInterviewDetail(values: DataShowSchedule) {
    setIdDetail(values.id)
    setVisibleDetail(true)
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

  const [outObject, setOutObject] = useState<ScheduleEntity | any>([])

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setCurrentDate();
  }, []);

  const setCurrentDate = (): any => {
    let getCurrWeek = new Date();
    let dayOfWeek = getCurrWeek.getDay();
    let numDay = getCurrWeek.getDate();
    let s = new Date(getCurrWeek);
    let e = new Date(getCurrWeek);
    s.setDate(numDay - dayOfWeek + 1);
    s.setHours(0, 0, 0, 0);
    e.setDate(numDay + (7 - dayOfWeek));
    e.setHours(23, 59, 59, 0);
    setStartDate(s);
    setEndDate(e);
    return [s, e];
  }

  const plusDays = (date: Date, count: number): Date => {
    return new Date(date.getTime() + count * 24 * 60 * 60 * 1000);
  }

  function getWeekDates(week: string) {

    switch (week) {

      case preWeek: {
        let s = plusDays(startDate, -7);
        let e = plusDays(endDate, -7);
        setStartDate(s);
        setEndDate(e);
        return [s, e];
      }
      case nextWeek: {
        let s = plusDays(startDate, 7);
        let e = plusDays(endDate, 7);
        setStartDate(s);
        setEndDate(e);
        return [s, e];
      }
      default:
        const [s, e] = setCurrentDate();
        return [s, e];
    }
  }

  function filterDatesByWeek(week: string, filterDate: ScheduleEntity[]) {
    let [start, end] = getWeekDates(week);

    const datesFilter: any = filterDate?.filter((d: any) => d.date >= +start && d.date < +end);
    const outObject = datesFilter?.reduce((acc: any, curr: any) => {
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
    return setOutObject(outObject)
  }

  function handleWeekClicked(week: string) {
    console.log("week: " + week);
    filterDatesByWeek(week, props.schedule?.result);
  }

  function handleFilterClicked(value: any) {
    console.log(`selected ${value}`);
    if (value !== "all") {
      props.getAllSchedule({key: value})
    } else props.getAllSchedule();
  }

  function onSearch(value: string) {
    value.trim()
    setKeySearch(value.trim())
    props.getAllSchedule({keySearch: value.trim()})
  }

  console.log(outObject)

  function onBtnResetClicked() {
    setKeySearch('')
    props.getAllSchedule();
  }

  return (
    <>
      <div className="c-schedule-container">
        <div className="c-schedule-header">
          <div className="c-schedule-header__align-left">
            <Button style={{fontWeight: 500}} onClick={() => handleWeekClicked(currWeek)}>
              <AiOutlineCalendar className="mr-1" size={20}/>
              Tuần này
            </Button>
            <Tooltip placement="top" title="Tuần trước">
              <Button onClick={() => handleWeekClicked(preWeek)}>
                <GrPrevious/>
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Tuần sau">
              <Button onClick={() => handleWeekClicked(nextWeek)}>
                <GrNext/>
              </Button>
            </Tooltip>
            {/*<div style={{marginRight: 5}} className="align">*/}
            {/*  <DateBox defaultValue={moment()} displayFormat="dd/MM/yyyy"*/}
            {/*           type="date"/>*/}
            {/*</div>*/}

            <Select defaultValue="all" className="select-custom"

                    style={{
                      fontWeight: 600,
                      width: 120,
                    }} onChange={handleFilterClicked}>
              <Option value="join">Tôi tham gia</Option>
              <Option value="create">Tôi tạo</Option>
              <Option value="all">Tất cả</Option>
            </Select>
          </div>

          <div className="c-schedule-header__align-right align">
            <Search
              placeholder="Tìm kiếm lịch theo tên ứng viên, tin tuyển dụng"
              onSearch={value => onSearch(value)}
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
        {keySearch ?
          <div style={{marginLeft: 15}}>
            <span>Kết quả tìm kiếm cho: </span>
            <span
              className="c-search-profile"
            >
              {keySearch}
            </span>
            <a style={{color: "black", fontStyle: "italic"}} onClick={onBtnResetClicked}>x</a>
          </div>
          : null}
        {outObject?.length > 0 ?
          outObject?.map((item: any, index: any) => {
            return <div className="c-schedule-content" key={item.date}>
              <div className="c-schedule-content__head">{item.date}</div>
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

      <ScheduleInterview/>
      <DetailScheduleInterview idDetail={idDetail} dataDetail={props.schedule.result} visible={visibleDetail}
                               handleClosePopupDetail={handleClosePopupDetail}/>
    </>
  );
}

export default connector(ScheduleManagerPages);
