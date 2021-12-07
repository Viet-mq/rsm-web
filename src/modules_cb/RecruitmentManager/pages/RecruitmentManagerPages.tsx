import React, {useEffect, useState} from "react";
import {Button, Icon, Select} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import Search from "antd/es/input/Search";
import ListRecruitment from "../components/list/ListRecruitment";
import {Link} from "react-router-dom";

const mapStateToProps = ({
                           jobManager: {
                             showForm,
                             list,
                             create,
                             deleteJob,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteJob,
  update,
})
const {Option} = Select;
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function RecruitmentManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
  }, []);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  const content = (
    <ul style={{width: 120}} className="popup-popover">
      <li>
        <a>Tất cả</a>
      </li>
      <li>
        <a>Đang tuyển dụng</a>
      </li>
      <li>
        <a>Công khai</a>
      </li>
      <li>
        <a>Nội bộ</a>
      </li>
      <li>
        <a>Ngưng nhận hồ sơ</a>
      </li>
      <li>
        <a>Nháp</a>
      </li>
      <li>
        <a>Đóng</a>
      </li>

    </ul>
  );

  const contentSort = (
    <ul style={{width: 120}} className="popup-popover">
      <li>
        <a>Ngày tạo</a>
      </li>
      <li>
        <a>Tiêu đề tin</a>
      </li>
      <li>
        <a>Tên đơn vị sử dụng</a>
      </li>
    </ul>
  );


  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);
  const [visibleSort, setVisibleSort] = useState<boolean>(false);

  const handleVisibleChange = (visible: any) => {
    console.log(visible)
    setVisiblePopover(visible);
  };

  const handleVisibleSortChange = (visible: any) => {
    console.log(visible)
    setVisibleSort(visible);
  };

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
          <Select defaultValue="all" className="select-custom"

                  style={{
                    fontWeight: 600,
                    width: 120,
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
            <span id='sort'>Sắp xếp theo</span>
            <Select defaultValue="createAt" className="select-custom"

                    style={{
                      fontWeight: 600,
                      width: 120,
                    }}>
              <Option value="createAt">Ngày tạo</Option>
              <Option value="title">Tiêu đề tin</Option>
              <Option value="unitUse">Tên đơn vị sử dụng</Option>

            </Select>
          </div>

        </div>
        <div className="c-schedule-header__align-right align">
          <Search
            placeholder="Tìm kiếm nhanh trong danh sách"
            onSearch={value => console.log(value)}
            style={{width: 340}}
          />
          <Button
            // onClick={handlePopupScheduleInterview}
            style={{marginLeft: 10}}>
            <Icon type="filter" style={{fontSize: "125%"}}/>
            Bộ lọc
          </Button>

          <Button
            // onClick={handlePopupScheduleInterview}
            style={{marginLeft: 10}}>
            <Icon type="export" style={{fontSize: "125%"}}/>
            Xuât file
          </Button>
        </div>

      </div>

      <ListRecruitment/>
      <ListRecruitment/>
      <ListRecruitment/>
    </div>
  );

}

export default connector(RecruitmentManagerPages);
