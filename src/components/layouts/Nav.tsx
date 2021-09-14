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

      <Menu.Item key="view-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/view-manager`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Quản lý view </span> : null}
        </Link>
      </Menu.Item>

      <Menu.Item key="api-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/api-manager`}>
          <span className="rd-icon rd-icon-home"/>
          {!props.hiddenLabel ? <span>Quản lý API </span> : null}
        </Link>
      </Menu.Item>

    </Menu>

  );
};

export default connector(Nav);
