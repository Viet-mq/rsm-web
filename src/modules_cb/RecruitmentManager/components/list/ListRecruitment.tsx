import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useState} from "react";
import {Popconfirm, Popover, Select} from "antd";
import {
  checkInformationValidate,
  deleteRecruitment,
  getDataRecruitmentUpdate,
  getListRecruitment,
  updateRecruitment
} from "../../redux/actions";
import {BsDot, BsThreeDotsVertical} from "react-icons/all";
import {Link} from "react-router-dom";
import {RecruitmentEntity} from "../../types";
import moment from "moment";
import 'moment/locale/vi';

const {Option} = Select;
const mapStateToProps = (state: RootState) => ({
  jobManager: state.recruitmentManager.list
})
const connector = connect(mapStateToProps, {
  getListRecruitment,
  deleteRecruitment,
  updateRecruitment,
  checkInformationValidate,
  getDataRecruitmentUpdate
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  recruitment: RecruitmentEntity
}

function ListRecruitment(props: IProps) {

  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const content = (<ul style={{width: 160}} className="popup-popover">
    <li><Link to={`/recruitment-manager/edit`} onClick={btnEditClicked}>Sửa tin</Link></li>
    <li><Link
      to={`/recruitment-manager/detail/${props.recruitment?.id}?roundID=${props.recruitment.interviewProcess[0].id}`}>Xem
      tin tuyển dụng</Link></li>
    <li>
      <Popconfirm
        title="Bạn muốn xóa tin tuyển dụng này chứ ?"
        okText="Xóa"
        placement="bottom"
        onCancel={event => {
          event?.stopPropagation();
        }}
        onConfirm={handleDelete}
      >
        <a>Xóa</a>
      </Popconfirm>
    </li>
  </ul>);

  const contentMore = (<div className="content-more">
    <div className="flex-items-center">
      <div className='border-right pr-3'>Người tạo: <span className="bold-text"> {props.recruitment.createBy}</span>
      </div>
      <div className=" ml-3">Ngày tạo: <span
        className="bold-text">{moment(props.recruitment.createAt).format(dateFormat)}</span></div>
    </div>
    <div className='border-right' style={{width: 200}}>Thời hạn dự kiến: <span className="bold-text"/></div>
  </div>)

  function handleDelete() {
    console.log(props.recruitment?.id)
    props.deleteRecruitment({id: props.recruitment?.id})
  }

  function btnEditClicked() {
    props.getDataRecruitmentUpdate(props.recruitment)
    props.checkInformationValidate(true)
  }

  const handleVisibleChange = (visible: any) => {
    setVisiblePopover(visible);
  };

  return (
    <>
      <div className="recruitment-list">
        <div className="header-box border-bottom">
          <div className="main-1__green-dot"/>
          <div className="header-box-main">
            <Link
              to={`/recruitment-manager/detail/${props.recruitment?.id}?roundID=${props.recruitment.interviewProcess[0].id}`}
              className="p">{props.recruitment.title}</Link>
            <div className="detail-flex">
              <div>{props.recruitment?.jobName}</div>
              <div><BsDot size={20}/></div>
              <div>Mức lương: <span className="p"> {props.recruitment?.detailOfSalary}</span>
              </div>

              <div className="ml-3">SL cần tuyển: <span className="p">{props.recruitment?.quantity}</span>
              </div>

              <div className="ml-3">Hạn nộp hồ sơ: <span
                className="p">{moment(props.recruitment?.deadLine).format(dateFormat)}</span>
              </div>

              <Popover content={contentMore} trigger="click">
                <a className="ml-3">Xem thêm</a>
              </Popover>
            </div>
          </div>
          <div>
            <Select defaultValue="all"

                    style={{
                      fontWeight: 600,
                      width: 150,
                    }}>
              <Option value="join">
                Công khai
              </Option>
              <Option value="create">Nội bộ</Option>
              <Option value="all">Ngưng nhận hồ sơ</Option>
              <Option value="close">Đóng</Option>
            </Select>

            <Popover
              onVisibleChange={handleVisibleChange}
              visible={visiblePopover}
              className="header-user-info"
              placement="bottomRight"
              content={content}
              trigger="click">

              <BsThreeDotsVertical id="three-dot"/>
            </Popover>


          </div>
        </div>
        <div className="list-process">
          {props.recruitment.interviewProcess.map((item: any, index: any) => {
            return <div className="flex-1"
                        style={index === props.recruitment?.interviewProcess?.length - 1 ? {borderRight: 0} : undefined}
                        key={index}>
              <div className="padding-process">
                <Link to={`/recruitment-manager/detail/${props.recruitment?.id}?roundID=${item.id}`}>
                  <div className="p">{item.total ? item.total : "0"}</div>
                  <div className="bold-text">{item.name}</div>
                </Link>
              </div>
            </div>
          })}

        </div>
      </div>

    </>
  );

}

export default connector(ListRecruitment);
