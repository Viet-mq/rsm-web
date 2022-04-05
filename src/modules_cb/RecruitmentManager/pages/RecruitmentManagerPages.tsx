import React, {useEffect, useState} from "react";
import {Button, DatePicker, Icon, Select} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getListRecruitment, getSearchRecruitment} from "../redux/actions";
import Search from "antd/es/input/Search";
import ListRecruitment from "../components/list/ListRecruitment";
import {Link} from "react-router-dom";
import moment from "moment";
import 'moment/locale/vi';
import {RecruitmentEntity} from "../types";
import {CheckViewAction, recruitment_path} from "../../../helpers/utilsFunc";

const {Option} = Select;
const {RangePicker} = DatePicker;

const mapStateToProps = (state: RootState) => ({
  listRecruitment: state.recruitmentManager.list,
  searchListRecruitment: state.recruitmentManager.search,
})

const connector = connect(mapStateToProps, {
  getListRecruitment,
  getSearchRecruitment
});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function RecruitmentManagerPages(props: IProps) {

  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const [valueDateRange, setValueDateRange] = useState<any[]>([])
  const [recruitment, setRecruitment] = useState<RecruitmentEntity[]>([])
  const [trigger, setTrigger] = useState({
    recruitment: false,
  })

  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
    props.getListRecruitment({page: 1, size: 91});
  }, []);

  useEffect(() => {
    setRecruitment(props.listRecruitment.rows)
  }, [props.listRecruitment]);


  useEffect(() => {
    if(trigger.recruitment){
      setRecruitment(props.searchListRecruitment.rows)
    }
  }, [props.searchListRecruitment.rows])

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

  function handleSearchRecruitment(value:any) {
    props.getSearchRecruitment({keySearch:value,page: 1, size: 100})
    setTrigger({...trigger,recruitment:true})
  }

  return (
    <div className="c-schedule-container">
      <div className='header-align recruitment-title'>
        <div className="tmp-title-page-size20">Tin tuyển dụng</div>
        <div>
          {CheckViewAction(recruitment_path, "create")
            ?
            <Link to={`/recruitment-manager/create`}>
              <Button type="primary">
                <Icon type="plus" style={{fontSize: "125%"}}/>
                Thêm mới
              </Button>
            </Link>
            : null}

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
            onSearch={handleSearchRecruitment}
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
        {recruitment.length > 0 ? recruitment?.map((item: any, index: any) => {
          return <div key={index}><ListRecruitment recruitment={item}/></div>

        }) : null}
      </div>
    </div>
  );

}

export default connector(RecruitmentManagerPages);
