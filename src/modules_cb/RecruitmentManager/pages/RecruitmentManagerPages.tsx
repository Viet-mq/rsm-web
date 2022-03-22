import React, {useEffect, useState} from "react";
import {Button, DatePicker, Icon, Select} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getListRecruitment} from "../redux/actions";
import Search from "antd/es/input/Search";
import ListRecruitment from "../components/list/ListRecruitment";
import {Link} from "react-router-dom";
import moment from "moment";
import 'moment/locale/vi';

const {Option} = Select;
const {RangePicker} = DatePicker;

const mapStateToProps = (state: RootState) => ({
  listRecruitment: state.recruitmentManager.list
})

const connector = connect(mapStateToProps, {
  getListRecruitment,
});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function RecruitmentManagerPages(props: IProps) {

  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  // const [valueDateRange, setValueDateRange] = useState<any[]>([moment(props.listRecruitment.rows[props.listRecruitment?.rows.length - 1]?.deadLine), moment(props.listRecruitment.rows[0]?.deadLine)])
  const [valueDateRange, setValueDateRange] = useState<any[]>([])

  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
    props.getListRecruitment({page: 1, size: 91});
  }, []);

  function onChangeDateRange(dates: any) {
    dates[0].set({hour: 0, minute: 0, second: 0})
    dates[1].set({hour: 23, minute: 59, second: 59})
    let [start, end] = [dates[0], dates[1]];
    props.getListRecruitment({from: +start, to: +end, page: 1, size: 92});
    setValueDateRange([start, end])
  }

  function handleCreateBySelected(value:any) {
    if (value !== "all") {
      props.getListRecruitment({key: value})
    } else{
      props.getListRecruitment({page: 1, size: 93});
    }
  }

  return (
    <div className="c-schedule-container">
      <div className='header-align recruitment-title'>
        <div className="tmp-title-page-size20">Tin tuyển dụng</div>
        <div>
          <Link to={`/recruitment-manager/create`}>
            <Button type="primary">
              <Icon type="plus" style={{fontSize: "125%"}}/>
              Thêm mới
            </Button>
          </Link>
        </div>
      </div>
      <div className='header-align recruitment-option'>
        <div className='recruitment-option__pop-over'>
        <Select getPopupContainer={(trigger:any) => trigger.parentNode} defaultValue="join" className="select-custom"

                  style={{
                    fontWeight: 600,
                    width: 155,
                    marginRight: 15
                  }}>
            <Option value="all">Tất cả</Option>
            <Option value="join">Đang tuyển dụng</Option>
            <Option value="public">Công khai</Option>
            <Option value="internal">Nội bộ</Option>
            <Option value="stop">Ngưng nhận hồ sơ</Option>
            <Option value="draft">Nháp</Option>
            <Option value="close">Đóng</Option>
          </Select>

          <div style={{display: "flex", alignItems: "center"}}>
            <span id='sort'>Lọc theo</span>
          <Select getPopupContainer={(trigger:any) => trigger.parentNode} defaultValue="all" className="select-custom"
                    onSelect={handleCreateBySelected}
                    style={{
                      fontWeight: 600,
                      width: 120,
                    }}>
              <Option value="all">Tất cả</Option>
              <Option value="create">Tôi tạo</Option>
              <Option value="join">Tôi tham gia</Option>

            </Select>
          </div>

          <div style={{marginLeft: 5, width: 250}} className="align">
            <RangePicker
              format={dateFormat}
              value={valueDateRange}
              placeholder={["Ngày tạo","Ngày tạo"]}
              allowClear={false}
              ranges={{
                'Hôm nay': [moment(), moment()],
                'Tháng này': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={onChangeDateRange}
            />
          </div>

        </div>
        <div className="c-schedule-header__align-right align">
          <Search
            placeholder="Tìm kiếm nhanh trong danh sách"
            onSearch={value => props.getListRecruitment({keySearch:value,page: 1, size: 94})}
            style={{width: 340}}
          />
          <Button
            // onClick={handlePopupScheduleInterview}
            style={{marginLeft: 10}}>
            <Icon type="export" style={{fontSize: "125%"}}/>
            Xuât file
          </Button>
        </div>
      </div>

      <div>
        {props.listRecruitment.rows.length > 0 ? props.listRecruitment.rows.map((item: any, index: any) => {
          return <div key={index}><ListRecruitment recruitment={item}/></div>

        }) : null}
      </div>
    </div>
  );

}

export default connector(RecruitmentManagerPages);
