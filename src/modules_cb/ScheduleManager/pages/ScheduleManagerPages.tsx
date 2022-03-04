import React, {useEffect, useState} from "react";
import {Avatar, Button, DatePicker, Icon, Input, Select, Tooltip} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {countBookingNumber,} from "../../ProfileManager/redux/actions";
import {AiOutlineCalendar, GrNext, GrPrevious} from "react-icons/all";
import moment from 'moment';
import 'moment/locale/vi';
import CreateScheduleInterview from "../components/CreateScheduleInterview";
import DetailScheduleInterview from "../components/DetailScheduleInterview";
import {getAllSchedule, showFormSchedule} from "../redux/actions";
import {DataShowSchedule, ScheduleEntity} from "../types";
import {useLocation} from "react-router-dom";

const {Search} = Input;
const {Option} = Select;
const {RangePicker} = DatePicker;

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
  idRecruitment?:string,
}

function ScheduleManagerPages(props: IProps) {
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const currWeek: string = 'currWeek';
  const preWeek: string = 'preWeek';
  const nextWeek: string = 'nextWeek';
  const [keySearch, setKeySearch] = useState<string>('')
  const [outObject, setOutObject] = useState<ScheduleEntity | any>([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [visibleDetail, setVisibleDetail] = useState(false)
  const [idDetail, setIdDetail] = useState<string>('');
  const [valueDateRange, setValueDateRange] = useState<any[]>([moment().startOf("week"), moment().endOf('week')])
  const {pathname} = useLocation();

  useEffect(() => {
    document.title = "Lịch";
    props.countBookingNumber();

    if (pathname.includes("recruitment-manager")) props.getAllSchedule({
      recruitment: props.idRecruitment,
    });
    else props.getAllSchedule();
  }, []);

  useEffect(() => {
    if (props.schedule?.result) {
      filterDatesByWeek(currWeek, props.schedule?.result);
    }
  }, [props.schedule?.result])

  useEffect(() => {
    setCurrentDate();
  }, []);

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

  const setCurrentDate = (): any => {
    let getCurrWeek = new Date();
    let dayOfWeek = getCurrWeek.getDay();
    if(dayOfWeek===0) dayOfWeek=7;
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
    setValueDateRange([moment(start), moment(end)])
    const datesFilter: any = filterDate?.filter((d: any) => d.date >= +start && d.date < +end);
    const outObject = dateFilter(datesFilter)
    return setOutObject(outObject)
  }

  function handleWeekClicked(week: string) {
    filterDatesByWeek(week, props.schedule?.result);
  }

  function handleFilterClicked(value: any) {
    if (value !== "all") {
      props.getAllSchedule({key: value})
    } else props.getAllSchedule();
  }

  function onSearch(value: string) {
    setKeySearch(value.trim())
    props.getAllSchedule({keySearch: value.trim()})
  }

  function onBtnResetClicked() {
    setKeySearch('')
    props.getAllSchedule();
  }

  function dateFilter(values: any) {
    const outObject = values.reduce((acc: any, curr: any) => {
      const queryResult = acc.find((qr: any) => {
        const a: any = qr.date;
        const b: any = moment(curr.date).format("DD [tháng] MM, YYYY");
       const diffTime = a.localeCompare(b)
        return diffTime === 0;

      });
      if (queryResult !== undefined) {
        queryResult.data.push(curr)
      } else {
        let newQR = {date: moment(curr.date).format("DD [tháng] MM, YYYY"), data: [curr]};
        acc.push(newQR);
      }
      return acc;
    }, []);
    return outObject
  }

  function onChangeDateRange(dates: any) {
    dates[0].set({hour: 0, minute: 0, second: 0})
    dates[1].set({hour: 23, minute: 59, second: 59})
    let [start, end] = [dates[0], dates[1]];
    setValueDateRange([start, end])
    const datesFilter: any = props.schedule?.result?.filter((d: any) => d.date >= +start && d.date < +end);
    const outObject = dateFilter(datesFilter)
    return setOutObject(outObject)
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
            <div style={{marginRight: 5, width: 250}} className="align">
              <RangePicker
                format={dateFormat}
                value={valueDateRange}
                allowClear={false}
                ranges={{
                  'Hôm nay': [moment(), moment()],
                  'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={onChangeDateRange}
              />
            </div>

          <Select getPopupContainer={(trigger:any) => trigger.parentNode} defaultValue="all" className="select-custom"

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
              <div
                className="c-schedule-content__head">{item.date.localeCompare(moment().format("DD [tháng] MM, YYYY")) === 0 ? "Hôm nay - " : null}{item.date}</div>
              {item.data?.map((itemChild: any, index1: any) => {
                return <div className="c-item " onClick={() => handlePopupScheduleInterviewDetail(itemChild)} key={index1}>
                  <div className="c-time-flex">
                    <div>
                      {moment(itemChild.date).format(timeFormat)} - {moment(itemChild.interviewTime).format(timeFormat)}
                    </div>
                    <div>
                      {itemChild.date>+moment()?
                        <span style={{color:"#1890ff"}}>Sắp diễn ra</span>
                        :
                        itemChild.interviewTime<+moment()?
                          <span style={{color:"red"}}>Đã kết thức</span>
                          :
                          <span style={{color:"#ffbd24"}}>Đang diễn ra</span>}
                    </div>
                  </div>

                  <div className={index1 === item.data?.length - 1 ? "c-main-content" : "c-main-content border-bottom"}>
                    <Avatar size={25} style={{backgroundColor: itemChild.avatarColor}}>
                      {getInitials(itemChild.fullName)}
                    </Avatar>
                    <div className="c-main-content__wrap-main">
                      <div className="main-1">
                        <a className="main-1__candidate-name">{itemChild.fullName}</a>
                        <div className="main-1__green-dot"></div>
                        <div className="main-1__job-description">{itemChild.recruitmentName}</div>
                      </div>
                      <div className="main-2">
                        <div className="ellipsis">{itemChild.type}</div>
                      </div>

                      <div className="main-2" style={{marginBottom: "-10px"}}>
                        <div className="ellipsis"><span>Người tạo:</span> {itemChild.createBy}</div>
                      </div>

                      <div className="main-2">
                        <div className="ellipsis"><span>Ngày tạo:</span> {moment(itemChild.createAt).format(dateFormat)}
                        </div>
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

      <CreateScheduleInterview/>
      <DetailScheduleInterview idDetail={idDetail} dataDetail={props.schedule.result} visible={visibleDetail}
                               handleClosePopupDetail={handleClosePopupDetail}/>
    </>
  );
}

export default connector(ScheduleManagerPages);
