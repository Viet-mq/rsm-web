import {Icon, Menu} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';
import SubMenu from "antd/es/menu/SubMenu";
import {
  AiOutlineAppstoreAdd,
  AiOutlineCheckCircle,
  AiOutlineFolderView,
  AiOutlineLinkedin,
  FaRegUser,
  FaSchool,
  FaUserLock,
  FaUsersCog,
  HiOutlineUserGroup,
  ImProfile,
  IoEyeSharp,
  IoIosListBox,
  MdOutlineSource,
  MdOutlineWorkOutline,
  RiFolderUserLine,
  RiMailSettingsLine
} from "react-icons/all";

const mapStateToProps = (state: RootState) => {
  return {
    isLogin: state.auth.auth.data?.code === 0,
    auth: state.auth.auth.data,
  };
};

interface ParentProps {
  hiddenLabel: boolean;
}

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends ParentProps, PropsFromRedux {
}

const Nav = (props: IProps) => {
  const paths = window.location.pathname.split('/');
  return (
    <Menu
      className="menu-left"
      defaultOpenKeys={[paths[1]]}
      defaultSelectedKeys={[paths[2]]}
      mode="inline"
    >
      <Menu.Item key="home" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/home`}>
          <Icon type="dashboard"/>
          <span>Dashboard </span>
        </Link>
      </Menu.Item>

      <Menu.Item key="account-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/account-manager`}>
          <Icon type="user"/>
          <span>Quản lý tài khoản </span>
        </Link>
      </Menu.Item>

      <Menu.Item key="profile-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/profile-manager`}>
          <ImProfile className="mr-2"/>
          {!props.hiddenLabel ? <span>Quản lý thông tin CV </span> : null}
        </Link>
      </Menu.Item>

      <SubMenu key="sub1" title={!props.hiddenLabel ? <span>CÀI ĐẶT</span> : <Icon type="setting"/>}>

        <Menu.Item key="view-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/view-manager`}>
            <IoEyeSharp className="mr-2"/>
            <span>Quản lý view </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="view-group-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/view-group-manager`}>
            <AiOutlineFolderView className="mr-2"/>
            <span>Quản lý view group  </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="api-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/api-manager`}>
            <FaUserLock className="mr-2"/>
            <span>Quản lý API </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="group-api-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/group-api-manager`}>
            <FaUsersCog className="mr-2"/>
            <span>Quản lý Group API </span>
          </Link>
        </Menu.Item>

      </SubMenu>

      <SubMenu key="sub2" title={!props.hiddenLabel ? <span>QUẢN LÝ DANH MỤC</span> : <Icon type="menu"/>}>

        <Menu.Item key="job-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/job-manager`}>
            <MdOutlineWorkOutline className="mr-2"/>
            <span>Quản lý công việc </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="department-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/department-manager`}>
            <HiOutlineUserGroup className="mr-2"/>
            <span>Quản lý phòng ban </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="joblevel-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/joblevel-manager`}>
            <FaRegUser className="mr-2"/>
            <span>Quản lý vị trí tuyển dụng </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="school-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/school-manager`}>
            <FaSchool className="mr-2"/>
            <span>Quản lý trường học</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="sourcecv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/sourcecv-manager`}>
            <AiOutlineLinkedin className="mr-2"/>
            <span>Quản lý nguồn CV </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="statuscv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/statuscv-manager`}>
            <AiOutlineCheckCircle className="mr-2"/>
            <span>Quản lý trạng thái CV </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="blacklist-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/blacklist-manager`}>
            <IoIosListBox className="mr-2"/>
            <span>Quản lý Blacklist </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="talent-pool-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/talent-pool-manager`}>
            <MdOutlineSource className="mr-2"/>
            <span>Quản lý Talent Pools </span>
          </Link>
        </Menu.Item>

      </SubMenu>

      <SubMenu key="sub3" title={!props.hiddenLabel ? <span>TALENT POOLS</span> : <RiFolderUserLine/>}>
        {props.auth?.pools.map((item: any) => {
          return <Menu.Item key={item.id} style={{display: 'flex', alignItems: 'center'}}>
            <Link to={`/talent-pool-manager/${item.id}`}>
              <Icon type="contacts"/>
              <span>{item.name} </span>
              <span>{item.count}</span>
            </Link>
          </Menu.Item>

        })}

      </SubMenu>

      <SubMenu key="sub4" title={!props.hiddenLabel ? <span>TÙY CHỈNH</span> : <AiOutlineAppstoreAdd/>}>
        <Menu.Item key="/email-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/email-manager`}>
            <RiMailSettingsLine className="mr-2"/>
            <span>Mẫu Email</span>
          </Link>
        </Menu.Item>
      </SubMenu>

    </Menu>

  );
};

export default connector(Nav);
