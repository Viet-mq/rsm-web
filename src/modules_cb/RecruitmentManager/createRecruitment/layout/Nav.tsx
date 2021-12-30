import {Icon, Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import {triggerCheckInformation} from "../../redux/actions";


const mapStateToProps = (state: RootState) => {
  return {
    isLogin: state.auth.auth.data?.code === 0,
    auth: state.auth.auth.data,
    count: state.profileManager.createBooking.count,
    checkValidate: state.recruitmentManager.createSteps
  };
};

interface ParentProps {
}

const connector = connect(mapStateToProps, {
  triggerCheckInformation
});
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends ParentProps, PropsFromRedux {
}

const Nav = (props: IProps) => {

  const paths = window.location.pathname.split('/');

  const [selectedKeys,setSelectedKeys]=useState("information")

  useEffect(()=>{
    console.log(props.checkValidate.isValidate)
    if(!props.checkValidate.isValidate){
      setSelectedKeys("information")
    }

  },[props.checkValidate.isValidate])

  function handleClick(event:any) {
    // if(!props.checkValidate.isValidate) setSelectedKeys("information")
    if(props.checkValidate.isValidate) setSelectedKeys(event.key)
  }

  return (
    <Menu
      className="menu-left"
      selectedKeys={[selectedKeys]}
      mode="inline"
      onClick={handleClick}
    >

      <Menu.Item key="information" className="flex-items-center">
        <Link to='/recruitment-manager/create/information'>
          <Icon type='form'/>
          <span>Thông tin ứng tuyển</span>
        </Link>
      </Menu.Item>

      {/*<Menu.Item key="process" className="flex-items-center">*/}
      {/*  <Link to='/recruitment-manager/create/process'>*/}
      {/*    <Icon type='team'/>*/}
      {/*    <span>Quy trình tuyển dụng</span>*/}
      {/*  </Link>*/}
      {/*</Menu.Item>*/}

      <Menu.Item key="process" className="flex-items-center">
        <div onClick={props.triggerCheckInformation}>
          <Icon type='team'/>
          <span>Quy trình tuyển dụng</span>
        </div>
      </Menu.Item>

      <Menu.Item key="interviewers" className="flex-items-center"
                 style={props.checkValidate.isValidate ? {} : {pointerEvents: 'none'}}>
        <Link to='/recruitment-manager/create/interviewers'>
          <Icon type='solution'/>
          <span style={props.checkValidate.isValidate ? {} : {color: '#969C9D'}}>Hội đông tuyển dụng</span>
        </Link>
      </Menu.Item>


    </Menu>
  );
};

export default connector(Nav);
