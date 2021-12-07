import {Icon, Menu} from 'antd';
import React from 'react';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: RootState) => {
  return {
    isLogin: state.auth.auth.data?.code === 0,
    auth: state.auth.auth.data,
    count: state.profileManager.createBooking.count
  };
};

interface ParentProps {

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
      defaultSelectedKeys={['information']}
      mode="inline"
    >
      <Menu.Item key="information" style={{display: 'flex', alignItems: 'center'}}>
        <Icon type="form"/>
        <span>Thông tin ứng tuyển</span>
      </Menu.Item>

      <Menu.Item key="recruitment-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Icon type="team"/>
        <span>Quy trình tuyển dụng</span>
      </Menu.Item>

      <Menu.Item key="profile-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Icon type="solution"/>
        <span>Hội đông tuyển dụng</span>
      </Menu.Item>
    </Menu>
  );
};

export default connector(Nav);
