import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useState} from "react";
import {Icon, Popconfirm, Popover} from "antd";
import {BsThreeDots, FaUserCircle} from "react-icons/all";
import {DeleteTalentPoolRequest, TalentPoolEntity} from "../types";
import {deleteTalentPool, showFormUpdate} from "../redux/actions";
import {Link} from 'react-router-dom';
import {CheckViewAction, talent_pool_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({talentPoolManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  deleteTalentPool,
  showFormUpdate,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  talentPool: TalentPoolEntity
}

function TalentPoolItem(props: IProps) {

  const {talentPool} = props;
  const iconUser = [
    <FaUserCircle size="35px" color="#FF7878" className="mr-2"/>,
    <FaUserCircle size="35px" color="#7EB5A6" className="mr-2"/>,
    <FaUserCircle size="35px" color="#F5E8C7" className="mr-2"/>,
    <FaUserCircle size="35px" color="#9E7777" className="mr-2"/>
  ]
  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);
  const icon: any[] = [];
  const loopIcon = () => {
    if (talentPool.managers.length > 3) {
      for (let i = 0; i < 3; i++) {
        icon.push(<span key={i}>{iconUser[Math.floor(Math.random() * iconUser.length)]}</span>);
      }
      icon.push(<span key="4" className="card-footer__img-radius">+{talentPool.managers.length - 3}</span>
      )
      return icon;
    } else {
      return talentPool.managers.map((item: any, index: any) => (
        <span key={index}>{iconUser[Math.floor(Math.random() * iconUser.length)]}</span>
      ));
    }

  }
  const handleUpdate = (e: any) => {
    e.preventDefault();
    setVisiblePopover(false)
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUpdate(true, talentPool);
  }

  const handleDelete = (event: any) => {
    event.stopPropagation();
    let req: DeleteTalentPoolRequest = {
      id: talentPool.id
    }
    props.deleteTalentPool(req);
  }

  const content = (
    <ul style={{width: 160}} className="popup-popover">
      <li>
        {CheckViewAction(talent_pool_path, "update")
          ?
          <a onClick={handleUpdate}>Chỉnh sửa</a>
          : null}

      </li>
      <li>
        {CheckViewAction(talent_pool_path, "delete")
          ?
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
          : null}


      </li>
    </ul>
  );

  const handleVisibleChange = (visible: any) => {
    setVisiblePopover(visible);
  };

  function handleDetailClicked() {
  }

  return (
    <>

      <div className='card-grid' onClick={handleDetailClicked}>
        <div className="card-title">
          <div className='card-title__title'>
            <Link to={`/talent-pool-manager/${talentPool.id}`}>
              <p>{talentPool.name}</p></Link>
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
          <Link to={`/talent-pool-manager/${talentPool.id}`}
                style={{color: "inherit"}}><p className="card-title__content">{talentPool.description}</p></Link>
        </div>
        <Link to={`/talent-pool-manager/${talentPool.id}`}
              style={{color: "inherit"}}>
          <div>
            <div className="card-content">
              <div>
                <Icon type="folder-open" theme="filled"/>
                <span className="card-content__number">{talentPool.numberOfProfile}</span>
                <span className=""> Total Contacts</span>
              </div>

              <div>
                <Icon type="flag" theme="filled"/>
                <span className="card-content__number">0</span>
                <span> New contacts in the last 30 days</span>
              </div>
            </div>
            <div className="card-footer">
              {loopIcon()}
            </div>
          </div>
        </Link>

      </div>

    </>
  );

}

export default connector(TalentPoolItem);
