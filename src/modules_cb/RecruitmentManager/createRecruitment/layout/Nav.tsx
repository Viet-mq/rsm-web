import {Icon, Menu} from 'antd';
import React from 'react';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import {StepNavInfo} from "../../types";
// import {setEnableNavStep} from "../../redux/actions";

const mapStateToProps = (state: RootState) => {
  return {
    isLogin: state.auth.auth.data?.code === 0,
    auth: state.auth.auth.data,
    count: state.profileManager.createBooking.count,
    navSteps: state.recruitmentManager.navSteps
  };
};

interface ParentProps {}

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends ParentProps, PropsFromRedux {
}

const Nav = ({navSteps}: IProps) => {

  const paths = window.location.pathname.split('/');

  return (
    <Menu
      className="menu-left"
      defaultSelectedKeys={[paths[3] ? paths[3] : "information"]}
      mode="inline"
    >
      {navSteps.navs.map((item: StepNavInfo) => {
        return (
          <Menu.Item key={item.key} style={item.style}>
            <Link to={item.link}>
              <Icon type={item.icon}/>
              <span style={item.styleText}>{item.text}</span>
            </Link>
          </Menu.Item>
        )
      })}
    </Menu>
  );
};

export default connector(Nav);
