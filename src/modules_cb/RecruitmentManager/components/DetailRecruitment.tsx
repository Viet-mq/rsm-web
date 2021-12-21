import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {Button, DatePicker, Dropdown, Icon, Layout, Menu, Popover, Select, Tabs} from "antd";
import {BsDot, ImArrowLeft2} from "react-icons/all";
import {Link, useParams} from "react-router-dom";
import Search from "antd/es/input/Search";
import {getListProfile} from "../../ProfileManager/redux/actions";
import ScheduleManagerPages from "../../ScheduleManager/pages/ScheduleManagerPages";
import KanbanProcess from "./KanbanProcess";
import ListProfile from "../../ProfileManager/components/list/ListProfile";
import moment from "moment";
import 'moment/locale/vi';
import {getListRecruitment} from "../redux/actions";

const {Option} = Select;
const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
const {Header, Content} = Layout;

const mapStateToProps = (state: RootState) => ({
  listCandidate: state.profileManager.list,
  listRecruitment: state.recruitmentManager.list,
})
const connector = connect(mapStateToProps, {
  getListRecruitment,
  getListProfile,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  location?: any
}

function DetailRecruitment(props: IProps) {
  const {idRecruitment} = useParams()
  const query = new URLSearchParams(props.location.search).get("roundID")
  const [page, setPage] = useState(1);
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const [idProcess,setIdProcess]=useState<any>(query);
  const [valueDateRange, setValueDateRange] = useState<any[]>([moment().startOf("week"), moment().endOf('week')])
  const contentMore = (<div className="content-more">
    <div className="flex-items-center">
      <div className='border-right pr-3'>Người tạo:<span className="bold-text"> Hồ Đức Duy</span></div>
      <div className=" ml-3">Ngày tạo:<span className="bold-text"> 29/11/2021</span></div>
    </div>
    <div className='border-right' style={{width: 200}}>Thời hạn dự kiến: <span className="bold-text"> 29/12/2021</span>
    </div>
  </div>)
  const menu = (<Menu className='detail-action'>
    <Menu.Item key="1">
      <div><Icon type="plus"/><span> Thêm hàng loạt</span></div>
    </Menu.Item>
    <Menu.Item key="2">
      <div><Icon type="export"/><span> Xuất Excel</span></div>
    </Menu.Item>
  </Menu>);

  useEffect(() => {
    props.getListProfile({recruitment: idRecruitment,statusCV:idProcess, page: page, size: 30});
  }, [page, idRecruitment,idProcess])

  useEffect(() => {
    document.title = "Chi tiết tin tuyển dụng";
  }, [document.title]);

  useEffect(() => {
    props.getListRecruitment({id:idRecruitment,page: 1, size: 100})
  }, []);

  const convertArrayToTree = (arrays: any) => {
    let dataFetch: any = [];
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i]?.children) {
        dataFetch.push({
          title: arrays[i].name,
          key: arrays[i].id,
          value: arrays[i].id,
          children: convertArrayToTree(arrays[i].children)
        })
      } else {
        dataFetch.push({
          title: arrays[i].name,
          key: arrays[i].id,
          value: arrays[i].id,
        })
      }
    }
    return dataFetch;
  }

  function callback(key: any) {
    console.log(key);
  }

  const operations = <Select className="tab-operator" defaultValue={"Công khai"}>
    <Option key={1} value={"Công khai"}>Công khai</Option>
    <Option key={2} value={"Nội bộ"}>Nội bộ</Option>
    <Option key={3} value={"Ngưng nhận hồ sơ"}>Ngưng nhận hồ sơ</Option>
    <Option key={4} value={"Đóng"}>Đóng</Option>
  </Select>;

  const [visibleType, setVisibleType] = useState<string>('list')

  function candidateListClicked() {
    setVisibleType("list")
  }

  function candidateKanbanClicked() {
    setVisibleType("kanban")
  }

  const [col, setCol] = useState({
    list: 24,
    filter: 0,
  })

  function onChangeDateRange(dates: any) {
    dates[0].set({hour: 0, minute: 0, second: 0})
    dates[1].set({hour: 23, minute: 59, second: 59})
    let [start, end] = [dates[0], dates[1]];
    setValueDateRange([start, end])
    // const datesFilter: any = props.schedule?.result?.filter((d: any) => d.date >= +start && d.date < +end);
    // const outObject = dateFilter(datesFilter)
    // return setOutObject(outObject)
  }


  function handleProcessClicked(value:string) {
    setIdProcess(value);
  }

  return (
    <>
      <div>
        <div className="header-box header-detail">
          <Link to={`/recruitment-manager`} style={{marginRight: 10, paddingTop: 5, color: "black"}}>
            <ImArrowLeft2 size={20}/>
          </Link>
          <div className="header-box-main">
            <span className="p">{props.listRecruitment?.rows[0]?.title}</span>
            <Link to={`/recruitment-manager/edit`}>
              <Icon type={"edit"} style={{fontSize: "150%", marginLeft: 15}}></Icon>
            </Link>
            <div className="detail-flex">
              <div>{props.listRecruitment?.rows[0]?.jobName}</div>
              <div><BsDot size={20}/></div>
              <div>Mức lương: <span className="p"> {props.listRecruitment?.rows[0]?.salary}</span>
              </div>

              <div className="ml-3">SL cần tuyển: <span className="p">{props.listRecruitment?.rows[0]?.quantity}</span>
              </div>

              <div className="ml-3">Hạn nộp hồ sơ: <span
                className="p">{moment(props.listRecruitment?.rows[0]?.quantity).format(dateFormat)}</span>
              </div>

              <Popover content={contentMore} trigger="click">
                <a className="ml-3">Xem thêm</a>
              </Popover>
            </div>
          </div>
          <div>
            <Dropdown.Button overlay={menu} style={{marginBottom: 15}} type="primary">Thêm ứng viên</Dropdown.Button>

          </div>
        </div>

        <Tabs defaultActiveKey="1" className="tab-detail" onChange={callback} tabBarExtraContent={operations}>
          <TabPane tab="Ứng viên" className="tab-candidate-detail" key="1" style={{background: "#e8e8e8"}}>
            <Layout className="layout-candidate-detail">
              <Header className='header-candidate-detail'>
                <div className='header-align recruitment-option'>
                  <div className='recruitment-option__pop-over'>
                    <Select defaultValue="join" className="select-custom"
                            style={{
                              fontWeight: 600,
                              width: 145,
                              marginRight: 15
                            }}>
                      <Option value="all">Tất cả</Option>
                      <Option value="join">Tiếp nhận hồ sơ</Option>
                      <Option value="public">Phỏng vấn</Option>
                      <Option value="internal">Offer</Option>
                      <Option value="stop">Đã tuyển</Option>
                      <Option value="draft">Bị loại</Option>
                    </Select>

                    <div style={{marginLeft: 5, width: 250}} className="align">
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

                  </div>
                  <div className="c-schedule-header__align-right align">
                    <Button size="large" className={visibleType === 'list' ? "icon-list is-active" : "icon-list"}
                            onClick={candidateListClicked}><Icon type="unordered-list"
                                                                 style={{fontSize: "150%"}}/></Button>

                    <Button size="large" className={visibleType === 'kanban' ? "is-active" : undefined}
                            onClick={candidateKanbanClicked}><Icon type="project" style={{fontSize: "150%"}}/></Button>

                    <div className="search-wrap">
                      <Search
                        // onSearch={btnSearchClicked}
                        placeholder="Tìm kiếm nhanh"/>
                    </div>

                    <Button className="ml-2" size={"large"}><Icon type="export" className="mr-1"/>Xuất dữ liệu</Button>

                  </div>
                </div>
              </Header>

              <Content>
                {visibleType === 'list' ?
                  <>
                    <>
                      <div className='recruitment-list'>
                        <div className="list-process">
                          {props.listRecruitment?.rows[0]?.interviewProcess.map((item: any, index: any) => {
                            return <div className="flex-1"
                                        style={index === props.listRecruitment?.rows[0]?.interviewProcess?.length - 1 ? {borderRight: 0} : undefined}
                                        key={index} onClick={()=>handleProcessClicked(item.id)}>
                              <div className={item.id.includes(idProcess)?"process-active":"padding-process"}>
                                <div className="p">2</div>
                                <div className="bold-text">{item.name}</div>
                              </div>
                            </div>
                          })}
                        </div>
                      </div>
                    </>
                    <ListProfile idRecruitment={idRecruitment}/>
                  </>
                  :
                  <KanbanProcess/>
                }
              </Content>
            </Layout>
          </TabPane>

          <TabPane tab="Lịch phỏng vấn" key="2" style={{background: "#e8e8e8", marginLeft: 40}}>
            <div className="schedule-tab-detail">
              <ScheduleManagerPages/>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );

}

export default connector(DetailRecruitment);
