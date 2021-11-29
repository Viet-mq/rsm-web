import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Avatar, Button, Icon, Popconfirm, Popover, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteJob,
  getListRecruitment,
  showFormCreate,
  showFormUpdate,
  updateJob
} from "../../redux/actions";

import {BsThreeDots} from "react-icons/all";

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
}

function ListRecruitment(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;

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

  const content = (
    <ul style={{width: 160}} className="popup-popover">
      <li>
        <a >Chỉnh sửa</a>
      </li>
      <li>

        <Popconfirm
          title="Bạn muốn xóa Talent pool này chứ ?"
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
    </ul>
  );

  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  const handleVisibleChange = (visible: any) => {
    setVisiblePopover(visible);
  };

  return (
    <>
      <div className="recruitment-list">
        <div>
          <div style={{display:"flex",alignItems:"center"}}>
            <div className="main-1__green-dot"></div>
            <div className="main-1__job-description">dataDetail?.recruitmentName</div>
          </div>
          <div>
            <div className="card-title">
              <div className='card-title__title'>
                <p>talentPool.name</p>
                <Popover
                  onVisibleChange={handleVisibleChange}
                  visible={visiblePopover}
                  className="header-user-info"
                  placement="bottomRight"
                  content={content}
                  trigger="click">

                  <BsThreeDots className="card-title__title--detail-icon" size='20px'/>
                </Popover>
              </div>
              <p className="card-title__content">talentPool.description</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );

}

export default connector(ListRecruitment);
