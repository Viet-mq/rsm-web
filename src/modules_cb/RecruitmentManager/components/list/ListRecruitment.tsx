import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {Popconfirm, Popover, Select} from "antd";
import {deleteJob, getListRecruitment, showFormCreate, showFormUpdate, updateJob} from "../../redux/actions";
import {BsDot, BsThreeDotsVertical} from "react-icons/all";
import {Link} from "react-router-dom";
import {RecruitmentEntity} from "../../types";
import moment from "moment";
import 'moment/locale/vi';

const {Option} = Select;
const mapStateToProps = ({jobManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListRecruitment,
  deleteJob,
  showFormCreate,
  showFormUpdate,
  updateJob
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  recruitment:RecruitmentEntity
}

function ListRecruitment(props: IProps) {
  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const content = (<ul style={{width: 160}} className="popup-popover">
      <li>
        <a>Sửa tin</a>
      </li>
      <li>
        <a>Nhân bản</a>
      </li>
      <li>
        <a>Chia sẻ</a>
      </li>
      <li>
        <a>Xem tin tuyển dụng</a>
      </li>
      <li>

        <Popconfirm
          title="Bạn muốn xóa tin tuyển dụng này chứ ?"
          okText="Xóa"
          onCancel={event => {
            event?.stopPropagation();
          }}
          onConfirm={event => handleDelete(event)}
        >
          <a
            onClick={event => {
              event.stopPropagation();
            }}
          >
            Xóa
          </a>
        </Popconfirm>
      </li>
    </ul>);
  const contentMore = (<div className="content-more">
    <div className="flex-items-center">
      <div className='border-right pr-3'>Người tạo:<span className="bold-text"> Hồ Đức Duy</span></div>
      <div className=" ml-3">Ngày tạo:<span className="bold-text"> 29/11/2021</span></div>
    </div>
    <div className='border-right' style={{width:200}}>Thời hạn dự kiến: <span className="bold-text"> 29/12/2021</span></div>
  </div>)

  useEffect(() => {
    props.getListRecruitment({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any) => {
    event.stopPropagation();

  }

  const handleEdit = (event: any) => {
    event.stopPropagation();
    props.showFormUpdate(true);
  }

  const handleVisibleChange = (visible: any) => {
    setVisiblePopover(visible);
  };

  return (
    <>
      <div className="recruitment-list">
        <div className="header-box border-bottom">
          <div className="main-1__green-dot"></div>
          <div className="header-box-main">
            <Link to={`/recruitment-manager/detail`} className="p">{props.recruitment.title}</Link>
            <div className="detail-flex">
              <div>{props.recruitment?.jobName}</div>
              <div><BsDot size={20}/></div>
              <div >Mức lương:</div>
              <div className="p">{props.recruitment?.detailOfSalary}</div>

              <div className="ml-3">SL cần tuyển:</div>
              <div className="p">{props.recruitment?.quantity}</div>

              <div className="ml-3">Hạn nộp hồ sơ:</div>
              <div className="p">{moment(props.recruitment?.quantity).format(dateFormat)}</div>

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
          {props.recruitment.interviewProcess.map((item:any, index:any)=>{
            return  <div className="flex-1" key={index}>
              <div className="padding-process">
                <div className="p">2</div>
                <div className="bold-text">{item.name}</div>
              </div>
            </div>
          })}


          {/*<div className="flex-1">*/}
          {/*  <div className="padding-process">*/}
          {/*  <div className="p">2</div>*/}
          {/*  <div className="bold-text">Thi tuyển</div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="flex-1">*/}
          {/*  <div className="padding-process">*/}
          {/*  <div className="p">2</div>*/}
          {/*  <div className="bold-text">Phỏng vấn</div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="flex-1">*/}
          {/*  <div className="padding-process">*/}
          {/*  <div className="p">2</div>*/}
          {/*  <div className="bold-text">Offer</div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="flex-1" style={{borderRight:0}}>
            <div className="padding-process">
            <div className="p">2</div>
            <div className="bold-text">Đã tuyển</div>
            </div>
          </div>

        </div>
      </div>

    </>
  );

}

export default connector(ListRecruitment);
