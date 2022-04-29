import React, {useEffect, useState} from "react";
import {Button, DatePicker, Icon, Select, TreeSelect} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getListRecruitment} from "../redux/actions";
import Search from "antd/es/input/Search";
import ListRecruitment from "../components/list/ListRecruitment";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import moment from "moment";
import 'moment/locale/vi';
import {RecruitmentEntity} from "../types";
import {CheckViewAction, recruitment_path} from "../../../helpers/utilsFunc";
import {searchListDepartment} from "../../DepartmentManager/redux/actions";
import {getListRecruitment as getListRecruitmentApi} from "../redux/services/apis";

const {Option} = Select;
const {RangePicker} = DatePicker;
const {TreeNode} = TreeSelect;

const mapStateToProps = (state: RootState) => ({
  recruitmentManager: state.recruitmentManager,
  listDepartment: state.departmentManager.list

})

const connector = connect(mapStateToProps, {
  getListRecruitment,
  searchListDepartment
});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function RecruitmentManagerPages(props: IProps) {
  const {list} = props.recruitmentManager
  const dateFormat = 'DD/MM/YYYY';
  // const timeFormat = 'HH:mm';
  const [valueDateRange, setValueDateRange] = useState<any[]>([])
  const [recruitment, setRecruitment] = useState<RecruitmentEntity[]>([])
  const fontWeightStyle = {fontWeight: 400};
  const [valueSelect, setValueSelect] = useState(undefined)
  const [valueFilter, setValueFilter] = useState("all")
  const [valueSearch, setValueSearch] = useState()
  let {path, url} = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
    let start;
    let end;

    const searchUrl = history.location.search?.substring(1, history.location.search?.length - 1)
      .split("&").reduce((curr: any, next: any) => {
        if(next!==""){
          let p = next.split("=");
          curr[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
          if(p[0]==="key"){
            setValueFilter(p[1])
          }
          if(p[0]==="keySearch"){
            setValueSearch(p[1])
          }
          if(p[0]==="department"){
            setValueSelect(p[1])
          }
          if(p[0]==="from"){
            start=moment(parseInt(p[1]))
          }
          if(p[0]==="to"){
            end=moment(parseInt(p[1]))

          }
          return curr;
        }
      }, {})
    setValueDateRange([start,end])

    props.getListRecruitment(searchUrl);
  }, []);

  useEffect(() => {
    setRecruitment(list.rows)
  }, [list]);

  // useEffect(() => {
  //   setRecruitment(search.rows)
  //
  // }, [search.rows])

  function onChangeDateRange(dates: any) {
    dates[0]?.set({hour: 0, minute: 0, second: 0})
    dates[1]?.set({hour: 23, minute: 59, second: 59})
    let [start, end] = [dates[0], dates[1]];
    console.log( [start, end])
    setValueDateRange([start, end])

    let req: any = {}
    let urlQuery = ""

    if (valueFilter) {
      req.key = valueFilter;
      urlQuery += `key=${req.key}&`
    }

    if (valueSearch) {
      req.keySearch = valueSearch;
      urlQuery += `keySearch=${req.keySearch}&`
    }

    if (valueSelect) {
      req.department = valueSelect
      urlQuery += `department=${req.department}&`
    }

    req.page = 1
    req.size = 93

    if (dates.length) {
      req.from = +start;
      urlQuery += `from=${req.from}&`

      req.to = +end;
      urlQuery += `to=${req.to}&`

      history.push({
        pathname: url,
        search: urlQuery
      })

      getListRecruitmentApi(req).then((rs: any) => {
        setRecruitment([...rs.rows])
      });
    } else {
      history.push({
        pathname: url,
        search: urlQuery
      })
      getListRecruitmentApi({page: 1, size: 92}).then((rs: any) => {
        setRecruitment([...rs.rows])
      });

    }
  }

  console.log(valueDateRange)

  function onChangeFilter(value: any) {
    setValueFilter(value)
    let req: any = {}
    let urlQuery = ""

    req.key = value
    urlQuery += `key=${req.key}&`

    if (valueSelect) {
      req.department = valueSelect
      urlQuery += `department=${req.department}&`
    }

    if (valueDateRange[0]) {
      req.from = +valueDateRange[0];
      urlQuery += `from=${req.from}&`
    }

    if (valueDateRange[1]) {
      req.to = +valueDateRange[1];
      urlQuery += `to=${req.to}&`
    }

    if (valueSearch) {
      req.keySearch = valueSearch;
      urlQuery += `keySearch=${req.keySearch}&`
    }

    req.page = 1
    req.size = 93

    history.push({
      pathname: url,
      search: urlQuery
    })
    getListRecruitmentApi(req).then(
      (rs: any) => {
        setRecruitment([...rs.rows])
      }
    )
  }

  function handleSearchRecruitment(value: any) {
    setValueSearch(value)
    let req: any = {}
    let urlQuery = ""
    if (valueFilter) {
      req.key = valueFilter;
      urlQuery += `key=${req.key}&`
    }
    if (valueSelect) {
      req.department = valueSelect
      urlQuery += `department=${req.department}&`
    }

    if (valueDateRange[0]) {
      req.from = +valueDateRange[0];
      urlQuery += `from=${req.from}&`
    }

    if (valueDateRange[1]) {
      req.to = +valueDateRange[1];
      urlQuery += `to=${req.to}&`
    }

    req.keySearch = value
    urlQuery += `keySearch=${value}&`

    req.page = 1
    req.size = 93
    history.push({
      pathname: url,
      search: urlQuery
    })
    getListRecruitmentApi(req).then(
      (rs: any) => {
        setRecruitment([...rs.rows])
      }
    )
  }

  function onChange(value: any) {
    setValueSelect(value)
    let req: any = {}
    let urlQuery = ""

    if (valueFilter) {
      req.key = valueFilter;
      urlQuery += `key=${req.key}&`
    }

    if (value) {
      req.department = value
      urlQuery += `department=${value}&`
    }

    if (valueDateRange[0]) {
      req.from = +valueDateRange[0];
      urlQuery += `from=${req.from}&`
    }

    if (valueDateRange[1]) {
      req.to = +valueDateRange[1];
      urlQuery += `to=${req.to}&`
    }

    if (valueSearch) {
      req.keySearch = valueSearch;
      urlQuery += `keySearch=${req.keySearch}&`
    }

    req.page = 1
    req.size = 93

    history.push({
      pathname: url,
      search: urlQuery
    })
    getListRecruitmentApi(req).then(
      (rs: any) => {
        setRecruitment([...rs.rows])
      }
    )
  };

  const filterTreeNode = (input: any, node: any) => {
    const title = node.props.title;
    return title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

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
          {/*<Select getPopupContainer={(trigger:any) => trigger.parentNode} defaultValue="join" className="select-custom"*/}

          {/*          style={{*/}
          {/*            fontWeight: 600,*/}
          {/*            width: 155,*/}
          {/*            marginRight: 15*/}
          {/*          }}>*/}
          {/*    <Option value="all">Tất cả</Option>*/}
          {/*    <Option value="join">Đang tuyển dụng</Option>*/}
          {/*    <Option value="public">Công khai</Option>*/}
          {/*    <Option value="internal">Nội bộ</Option>*/}
          {/*    <Option value="stop">Ngưng nhận hồ sơ</Option>*/}
          {/*    <Option value="draft">Nháp</Option>*/}
          {/*    <Option value="close">Đóng</Option>*/}
          {/*  </Select>*/}

          <div style={{display: "flex", alignItems: "center"}}>
            <span id='sort'>Lọc theo</span>
            <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                    value={valueFilter}
                    className="select-custom"
                    onSelect={onChangeFilter}
                    style={{
                      fontWeight: 600,
                      width: 120,
                    }}>
              <Option value="all">Tất cả</Option>
              <Option value="create">Tôi tạo</Option>
              <Option value="join">Tôi tham gia</Option>

            </Select>
          </div>

          <div style={{display: "flex", alignItems: "center"}}>
            <span id='sort'>Thuộc phòng ban</span>
            <TreeSelect
              style={{width: 200, ...fontWeightStyle}}
              showSearch
              allowClear
              value={valueSelect}
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              placeholder="Chọn phòng ban"
              className="bg-white text-black form-label"
              onChange={onChange}
              getPopupContainer={(trigger: any) => trigger.parentNode}
              filterTreeNode={filterTreeNode}

            >
              {props.listDepartment.rows?.map((item: any) => (
                <TreeNode style={fontWeightStyle} value={item.id} title={item.name} key={item.id}>
                  {item.children ? item.children.map((el: any) => (
                    <TreeNode style={fontWeightStyle} value={el.id} key={el.id} title={el.name}/>
                  )) : null}
                </TreeNode>

              ))}

            </TreeSelect>
          </div>

          <div style={{marginLeft: 5, width: 250}} className="align">
            <RangePicker
              format={dateFormat}
              value={valueDateRange}
              placeholder={["Ngày tạo", "Ngày tạo"]}
              allowClear={true}
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
            value={valueSearch}
            onChange={(event:any)=>setValueSearch(event.target.value)}
            placeholder="Tìm kiếm nhanh trong danh sách"
            onSearch={handleSearchRecruitment}
            style={{width: 340}}
          />
          {CheckViewAction(recruitment_path, "export") && <Button
            // onClick={handlePopupScheduleInterview}
            style={{marginLeft: 10}}>
            <Icon type="export" style={{fontSize: "125%"}}/>
            Xuất file
          </Button>}

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
