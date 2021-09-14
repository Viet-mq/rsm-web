import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import {RootState} from 'src/redux/reducers';
import {useParams} from 'react-router-dom';
import {LOCALE_CONFIG} from './config';
import {getListTimesheetByMonth} from '../../redux/actions';
import {
  ActionItem,
  ActionWrapper,
  Cell,
  CheckIn,
  Date,
  Icon,
  Label,
  Row,
  SmallLabel,
  SmallLabel2,
  StyledCalendar,
  StyledPopover,
  Total,
} from './styled';

import dayIcon from './images/day.png';
import nightIcon from './images/night.png';

const mapStateToProps = (rootState: RootState) => ({
  userInfo: rootState.auth.auth.data,
  listTimesheetByMonth: rootState.dashboard.listTimesheetByMonth,
});

const mapDispatchToProps = {
  getListTimesheetByMonth: getListTimesheetByMonth
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {
  departmentId?: any;
  selectedTime?: any;
  setSelectedTime?: any;
}

interface TimeInterface {
  [key: string]: any;
}

const Actions = (props: any) => {
  if (props.isFuture)
    return null;
  console.log('props => ', props);
  return (
    <ActionWrapper>
      {props.is_late === 1 && (
        <ActionItem
          onClick={(e: any) => {
            e.stopPropagation();
            props.onOpenModal('reason-late', props.date);
          }}
        >
          Xác nhận lý do đi muộn
        </ActionItem>
      )}
      {props.is_come_back_early === 1 && (
        <ActionItem
          onClick={(e: any) => {
            e.stopPropagation();
            props.onOpenModal('reason-early', props.date);
          }}
        >
          Xác nhận lý do về sớm
        </ActionItem>
      )}
      {}
    </ActionWrapper>
  );
};

const renderTimeWork = (value: any, type: string) => {
  const v = Number(value);
  if (!v) {
    return null;
  }
  return (
    <>
      <Total>{v.toFixed(1)}</Total>
      <Icon src={type == 'day' ? dayIcon : nightIcon} alt={type}/>
    </>
  );
};

const renderDetail = (dataItem: any) => {
  const {
    is_overtime,
    overtime_day,
    night_wage,
    day_wage,
    is_late,
    is_leave_request,
    leave_type,
    is_close,
    leave_request_reason,
  } = dataItem;
  const time_in = dataItem.time_in || 0;
  const time_out = dataItem.time_out || 0;
  const type = dataItem.type || 'working';
  return (
    <>
      <Row>
        <span style={{height: '22px'}}>
          {// so gio lam viec ca ngay;
            renderTimeWork(day_wage, 'day')}
          {// so gio lam viec ca dem;
            renderTimeWork(night_wage, 'night')}
        </span>
        <span>
          {// tang ca;
            is_overtime ? <SmallLabel color="#FDB906">OT</SmallLabel> : null}
        </span>
        <span>
          {leave_type ? <SmallLabel color="#36A2DF">{leave_type}</SmallLabel> : null}
        </span>
        {/* nghỉ phép */}
        <span>
          {leave_request_reason?.take_leave_code ? (
            <SmallLabel2 color="#36A2DF">{leave_request_reason.take_leave_code}</SmallLabel2>
          ) : null}
        </span>
      </Row>

      <Row>
        {(type == 'working' || time_in || time_out) ? (
          <CheckIn color={time_in & time_out ? '#E8F9EA' : '#FFD4D4'}>
            {time_in ? moment(time_in).format('HH:mm') : '??:??'}
            <span> - </span>
            {time_out ? moment(time_out).format('HH:mm') : '??:??'}
          </CheckIn>
        ) : null}

        {// di muon;
          is_late && type == 'working' ? <SmallLabel color="#E45356">M</SmallLabel> : null}
      </Row>
    </>
  );
};

const renderOnlyDate = (date: any, opacity: any) => {
  return (
    <Cell opacity={opacity}>
      <Row>
        <Date>{date.format('DD')}</Date>
      </Row>
    </Cell>
  );
};

const TimesheetWidget = ({
                           getListTimesheetByMonth,
                           listTimesheetByMonth,
                           departmentId,
                           setSelectedTime,
                           selectedTime,
                           userInfo,
                         }: IProps) => {
  const [timeSheet, setTimesheet] = useState({});
  const params: any = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalDate, setModalDate] = useState('');
  const [employee_id, setemployeeId] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      const timesheetParams: any = {
        department_id: departmentId,
        date: moment(selectedTime)
          .startOf('month')
          .format('DD/MM/YYYY'),
        type: 2,
      };

      // load data;
      if (params.employeeId) {
        timesheetParams.employee_id = params.employeeId;
      }

      getListTimesheetByMonth(timesheetParams);
    }

    setMounted(true);

  }, [selectedTime,  departmentId]);

  useEffect(() => {
    if (params.selectedTime) {
      setSelectedTime(1 * params.selectedTime);
    }
  }, [params.selectedTime]); // chay tu bang cong sang;

  useEffect(() => {
    // render calendar;
    if (listTimesheetByMonth.item && listTimesheetByMonth.item.timeSheet) {
      const dataOfMonth = listTimesheetByMonth.item.timeSheet || [];
      const timeSheet: TimeInterface = {};
      for (let i = 0; i < dataOfMonth.length; ++i) {
        timeSheet[dataOfMonth[i]['date']] = dataOfMonth[i];
      }

      setTimesheet(timeSheet);
    }
  }, [listTimesheetByMonth.item]);

  const dateCellRender = (value: any) => {
    const otherMonth = value.format('MM') != moment(selectedTime).format('MM');

    const index = value.format('DD/MM/YYYY');
    const isFuture = value.isAfter(moment());

    const dataItem = (timeSheet as any)[index];

    const time_in = dataItem ? dataItem['time_in'] : 0;
    const time_out = dataItem ? dataItem['time_out'] : 0;

    // with non data;
    if (!dataItem) {
      return renderOnlyDate(value, otherMonth ? 0.2 : 1);
    }

    const openModal = (type: any, date: any) => {
      const id = params.employeeId ? params.employeeId : '';
      setOpenModal(true);
      setModalDate(date);
      setModalType(type);
      setemployeeId(id);
    };

    return (
      <StyledPopover
        content={
          <Actions
            is_close={dataItem.is_close}
            is_late={dataItem.is_late}
            is_come_back_early={dataItem.is_come_back_early}
            time_in={dataItem.time_in}
            time_out={dataItem.time_out}
            isFuture={isFuture}
            date={index}
            onOpenModal={openModal}
            inOut={isFuture ? null : time_in * time_out ? 1 : 0}
          />
        }
        trigger="click"
      >
        <Cell opacity={otherMonth ? 0.2 : 1}>
          <Row>
            <Date>{value.format('D')}</Date>
            <Label>{dataItem && dataItem['department'] && dataItem['department']['code']}</Label>
          </Row>
          {isFuture ? (
            <Row>
              {dataItem && dataItem['leave_type'] ? (
                <SmallLabel color="#36A2DF">{dataItem['leave_type']}</SmallLabel>
              ) : null}
              {dataItem && dataItem['leave_request_reason'] !== null ? (
                <SmallLabel2 color="#36A2DF">{dataItem['leave_request_reason'].take_leave_code}</SmallLabel2>
              ) : null}
              {// tang ca;
                dataItem && dataItem['is_overtime'] ? <SmallLabel color="#FDB906">OT</SmallLabel> : null}
            </Row>
          ) : (
            // detail;
            renderDetail(dataItem)
          )}
        </Cell>
      </StyledPopover>
    );
  };

  return (
    <>
      <StyledCalendar
        locale={LOCALE_CONFIG}
        value={moment(selectedTime)}
        onSelect={() => {
        }}
        headerRender={() => null}
        dateFullCellRender={dateCellRender}
      />
    </>
  );
};

export default connector(TimesheetWidget);
