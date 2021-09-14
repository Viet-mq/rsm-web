import React, {useState} from 'react';
import {Avatar, Icon, Layout, Popover} from 'antd';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, showChangePasswordForm} from '../../modules/Auth/redux/actions';
import {RootState} from '../../redux/reducers';
import ChangePasswordModal from 'src/modules/Auth/components/ChangePasswordModal';

const {Header} = Layout;
const mapState = ({auth: {auth: {data: auth},},}: RootState) => ({
  auth,

});

const connector = connect(mapState, {
  showChangePasswordForm,
  logout,
});

interface ParentProps {
  children: any;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends ParentProps, PropsFromRedux {
}

const Head = (props: IProps) => {

  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  const content = (
    <ul style={{width: 160}} className="popup-popover">
      <li>
        <Link to={'/quan-ly-ho-so-nhan-su/ho-so-nhan-su/' + props.auth?.username}>Hồ sơ</Link>
      </li>
      <li>
        <Link onClick={() => changePassword()} to="#">Đổi mật khẩu</Link>
      </li>
      <li>
        <Link onClick={() => logout()} to=""> Đăng xuất</Link>
      </li>
    </ul>
  );

  const logout = () => {
    props.logout();
  };

  const changePassword = () => {
    setVisiblePopover(false);
    props.showChangePasswordForm();
  }

  const handleVisibleChange = (visible: any) => {
    setVisiblePopover(visible);
  };

  return (
    <>
      <Header className="header">
        {props.children}
        <div className="userInfo">
          <Popover onVisibleChange={handleVisibleChange}
                   visible={visiblePopover}
                   className="header-user-info"
                   placement="bottomRight"
                   content={content}
                   trigger="click">
            <Avatar
              src={require('src/assets/images/avatar-default.png')}/>
            <span className="username">{props.auth?.fullName}</span>
            <Icon type="down"/>
          </Popover>
        </div>
      </Header>
      <ChangePasswordModal/>
    </>
  );
};



export default connector(Head);
