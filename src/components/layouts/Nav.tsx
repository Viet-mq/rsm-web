import {Icon, Menu} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';
import SubMenu from "antd/es/menu/SubMenu";

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

      <Menu.Item key="statistic" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/statistic`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Thống kê </span> : null}
        </Link>
      </Menu.Item>

      <Menu.Item key="account-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/account-manager`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Quản lý tài khoản </span> : null}
        </Link>
      </Menu.Item>

      <SubMenu key="sub1" title={<span><Icon type="user"/><span>Xử lý ngôn ngữ tự nhiên</span></span>}>

        <Menu.Item key="content-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to="/content-manager">
            {!props.hiddenLabel ? <span>Quản lý nội dung</span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="intent-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to="/intent-manager">
            {!props.hiddenLabel ? <span>Quản lý ý định</span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="entity-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to="/entity-manager">
            {!props.hiddenLabel ? <span>Quản lý thực thể</span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="follow-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to="/follow-manager">
            {!props.hiddenLabel ? <span>Quản lý kịch bản</span> : null}
          </Link>
        </Menu.Item>

      </SubMenu>

      <Menu.Item key="view-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/view-manager`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Quản lý view </span> : null}
        </Link>
      </Menu.Item>

      <Menu.Item key="view-group-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/view-group-manager`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Quản lý view group  </span> : null}
        </Link>
      </Menu.Item>

      <Menu.Item key="api-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/api-manager`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Quản lý API </span> : null}
        </Link>
      </Menu.Item>

      <Menu.Item key="group-api-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/group-api-manager`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Quản lý Group API </span> : null}
        </Link>
      </Menu.Item>

      <SubMenu key="sub2" title={<span><Icon type="menu"/><span>Quản lý danh mục</span></span>}>

        <Menu.Item key="job-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/job-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý job </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="department-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/department-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý phòng ban </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="joblevel-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/joblevel-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý job level </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="school-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/school-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý trường </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="sourcecv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/sourcecv-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý nguồn CV </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="statuscv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/statuscv-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý trạng thái CV </span> : null}
          </Link>
        </Menu.Item>
`
        <Menu.Item key="profile-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/profile-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý thông tin CV </span> : null}
          </Link>
        </Menu.Item>

        <Menu.Item key="blacklist-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/blacklist-manager`}>
            <span className="rd-icon rd-icon-home"/>
            {!props.hiddenLabel ? <span>Quản lý Blacklist </span> : null}
          </Link>
        </Menu.Item>

      </SubMenu>

    </Menu>

  );
};

export default connector(Nav);
