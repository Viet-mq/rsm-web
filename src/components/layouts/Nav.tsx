import {Icon, Menu} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';
import SubMenu from "antd/es/menu/SubMenu";
import {
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
  MdOutlineWorkOutline
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
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Dashboard </span> : null}
        </Link>
      </Menu.Item>

      <Menu.Item key="account-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/account-manager`}>
          <Icon type="user"/>
          {!props.hiddenLabel ? <span>Quản lý tài khoản </span> : null}
        </Link>
      </Menu.Item>

      <SubMenu key="sub1" title={<span><Icon type="setting"/><span>Cài Đặt</span></span>}>

        <Menu.Item key="view-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/view-manager`}>
            <IoEyeSharp className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý view </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="view-group-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/view-group-manager`}>
            <AiOutlineFolderView className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý view group  </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="api-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/api-manager`}>
            <FaUserLock className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý API </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="group-api-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/group-api-manager`}>
            <FaUsersCog className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý Group API </span> : null}
          </Link>
        </Menu.Item>

      </SubMenu>


      <SubMenu key="sub2" title={<span><Icon type="menu"/><span>Quản lý danh mục</span></span>}>

        <Menu.Item key="job-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/job-manager`}>
            <MdOutlineWorkOutline className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý job </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="department-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/department-manager`}>
            <HiOutlineUserGroup className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý phòng ban </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="joblevel-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/joblevel-manager`}>
            <FaRegUser className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý job level </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="school-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/school-manager`}>
            <FaSchool className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý trường </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="sourcecv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/sourcecv-manager`}>
            <AiOutlineLinkedin className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý nguồn CV </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="statuscv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/statuscv-manager`}>
            <AiOutlineCheckCircle className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý trạng thái CV </span> : null}
          </Link>
        </Menu.Item>
        `
        <Menu.Item key="profile-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/profile-manager`}>
            <ImProfile className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý thông tin CV </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="blacklist-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/blacklist-manager`}>
            <IoIosListBox className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý Blacklist </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="talent-pool-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/talent-pool-manager`}>
            <MdOutlineSource className="mr-2"/>
            {!props.hiddenLabel ? <span>Quản lý Talent Pool </span> : null}
          </Link>
        </Menu.Item>

      </SubMenu>

    </Menu>

  );
};

export default connector(Nav);
