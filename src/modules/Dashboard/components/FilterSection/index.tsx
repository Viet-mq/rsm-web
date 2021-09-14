import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'antd';
import moment from 'moment';

import {RootState} from 'src/redux/reducers';

import {MonthPickerWrapper} from 'src/components/DateTimePicker';
import {getStatisticByMonth} from '../../redux/actions';

import {
  CategoriesStatistic,
  Category,
  Heading,
  Padding,
  PageHeader,
  PanelContent,
  Title,
  Value,
  Wrapper
} from './styled';


const mapStateToProps = (rootState: RootState) => ({
  statisticByMonth: rootState.dashboard.statisticByMonth,
});

const connector = connect(mapStateToProps, {
  getStatisticByMonth,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {
  departmentId?: any;
  selectedTime?: any;
  setSelectedTime?: any;
  setDepartmentId?: any;
}

const FilterSection = ({
                         getStatisticByMonth,
                         statisticByMonth,
                         selectedTime,
                         setSelectedTime,
                         departmentId,
                         setDepartmentId

                       }: IProps) => {

  const [paramsSearch, setParamsSearch] = useState({
    date: moment(selectedTime).startOf("month").format("DD/MM/YYYY"),
    // type: timesheetType == "hour" ? 1 : 2,  // gio cong = 1, ngay cong = 2
    type: 2,
  });

  const params: any = useParams();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      const statisticParams: any = {
        department_id: departmentId,
        type: paramsSearch.type,
        date: moment(selectedTime).startOf("month").format("DD/MM/YYYY"),
      };

      if (params.employeeId) {
        statisticParams.employee_id = params.employeeId;
      }

      getStatisticByMonth(statisticParams);
      // reload statistic data;
    }
    setMounted(true);
  }, [selectedTime,  departmentId]);


  useEffect(() => {
    if (params.selectedTime) {
      setSelectedTime(1 * params.selectedTime);
    }
  }, [params.selectedTime]); // chay tu bang cong sang;


  // set params for search components;
  const setParams = (key: string, value: any) => {
    setParamsSearch({
      ...paramsSearch, [key]: value
    });
  }


  const onTimeSelected = (value: any) => {
    setSelectedTime(value);
  }


  // chon ngay cong hay gio cong;
  const onTypeChange = (e: any) => {
    setParams('type', e.target.value);
    // reload statistic;
  };

  const onDepartmentChange = (value?: string) => {
    if (value) {
      setDepartmentId(value);
    }
  }


  const getStatisticValue = (key: string) => {
    if (!statisticByMonth.item) return null;
    const value = statisticByMonth.item[key] || 0;
    return value.toFixed(0);
  }
  const getStatisticValue1 = (key: string) => {
    if (!statisticByMonth.item) return null;
    const value = statisticByMonth.item[key] || 0;
    return value.toFixed(1);
  }
  const getLeaveRequestStatistics = (key: string) => {
    if (!statisticByMonth.item) return null;
    const value = statisticByMonth.item[key] || 0;
    return value;
  }

  const offReason = [
    {index: 0, name: 'Đi họp', quantity: 2},
    {index: 1, name: 'Nghỉ ốm', quantity: 0},
    {index: 2, name: 'Đi học', quantity: 1},
    {index: 3, name: 'Đi họp', quantity: 2},
    {index: 4, name: 'Nghỉ ốm', quantity: 0},
    {index: 5, name: 'Đi học', quantity: 1},
    {index: 6, name: 'Đi họp', quantity: 2},
    {index: 7, name: 'Nghỉ ốm', quantity: 0},
    {index: 8, name: 'Đi học', quantity: 1},
  ]

  return (
    <Wrapper>
      <PageHeader>
        <Col md={8}>
          <Padding>
            <MonthPickerWrapper
              onChange={onTimeSelected}
              selectedTime={selectedTime}
            />
          </Padding>
        </Col>

        {/* <Col md={8}>
                    <Padding style={{padding: 5}}>
                        <Radio.Group onChange={onTypeChange}>
                            <Radio value={1}>Giờ công</Radio>
                            <Radio value={2}>Ngày công</Radio>
                        </Radio.Group>
                    </Padding>
                </Col> */}
        {/* <Col md={8}>
                    <Padding>
                        <DepartmentSelector
                            placeholder="&emsp;&ensp;Đơn vị"
                            value={departmentId || undefined}
                            allowClear={true}
                            onChange={onDepartmentChange}
                        />
                        { !departmentId && <SearchIcon type="search" className="certain-category-icon" /> }
                    </Padding>
                </Col> */}
      </PageHeader>

      <PanelContent>
        <Row gutter={20} style={{display: "flex", alignItems: "stretch"}}>
          <Col span={12} style={{display: "flex", flexDirection: "column"}}>
            <Heading>THỐNG KÊ</Heading>
            <CategoriesStatistic>
              <Category>
                <Title>Số lần đi muộn</Title>
                <Value>{getStatisticValue("num_late")}</Value>
              </Category>
              <Category>
                <Title>Số lần về sớm</Title>
                <Value>{getStatisticValue("num_come_back_early")}</Value>
              </Category>
              <Category>
                <Title>Số ngày điểm danh</Title>
                <Value>{getStatisticValue("num_forget")}</Value>
              </Category>
              <Category>
                <Title>Số ngày vắng mặt không lý do</Title>
                <Value>{getStatisticValue("num_not_check")}</Value>
              </Category>
              <Category>
                <Title>Số ngày nghỉ có lý do</Title>
                <Value>{getStatisticValue1("day_wage_leave_request")}</Value>
              </Category>
              {/* <Category>
                                <Title>Tổng số ngày phép</Title>
                                <Value>{getStatisticValue1("num_leave")}</Value>
                            </Category>
                            <Category>
                                <Title>Số ngày phép đã dùng</Title>
                                <Value>{getStatisticValue1("num_leave_use")}</Value>
                            </Category>
                            <Category>
                                <Title>Số ngày phép còn lại</Title>
                                <Value>{getStatisticValue1("num_leave") - getStatisticValue1("num_leave_use")}</Value>
                            </Category> */}
            </CategoriesStatistic>
          </Col>
          <Col span={12}>
            <Heading>THỐNG KÊ NGÀY NGHỈ THEO LÝ DO</Heading>
            <CategoriesStatistic>
              {getLeaveRequestStatistics('leave_request_statistics')?.map((item: any, index: any) => <>
                <Category key={index}>
                  <Title>{item.reason.name}</Title>
                  <Value>{item.num_of_days.toFixed(1)}</Value>
                </Category>
              </>)}
            </CategoriesStatistic>
          </Col>
        </Row>
      </PanelContent>
    </Wrapper>
  )
}

export default connector(FilterSection);
