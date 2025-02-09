import {Badge, Icon, Menu, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';
import SubMenu from "antd/es/menu/SubMenu";
import {
  AiOutlineAppstoreAdd,
  AiOutlineCheckCircle,
  AiOutlineFolderView,
  AiOutlineLinkedin,
  AiOutlineMinusCircle,
  FaRegUser,
  FaSchool,
  FaUserLock,
  FaUsersCog,
  GiSkills,
  HiOutlineUserGroup,
  IoEyeSharp,
  IoIosListBox,
  MdOutlineSource,
  MdOutlineWorkOutline,
  RiFolderUserLine,
  RiMailSettingsLine,
  RiMapPin2Line,
  RiOrganizationChart
} from "react-icons/all";
import Search from "antd/es/input/Search";
import {TalentPoolEntity} from "../../modules_cb/TalentPoolManager/types";

interface ParentProps {
  hiddenLabel: boolean;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends ParentProps, PropsFromRedux {
}

const mapStateToProps = (state: RootState) => {
  return {
    // isLogin: state.auth.auth.data?.code === 0,
    permission: state.auth.auth.data?.permissions,
    listTalentPool: state.talentPoolManager.list,
    count: state.profileManager.createBooking.count
  };
};

const connector = connect(mapStateToProps, {});

const Nav = (props: IProps) => {
  const paths = window.location.pathname.split('/');
  const [talentPool, setTalentPool] = useState<TalentPoolEntity[]>()

  useEffect(() => {
    setTalentPool(props.listTalentPool.rows)
  }, [props.listTalentPool.rows])

  function handleSearch(e: any) {
    setTalentPool(props.listTalentPool.rows?.filter((item: TalentPoolEntity) => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

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

      <Menu.Item key="recruitment-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/recruitment-manager`}>
          <Icon type="inbox"/>
          <span>Tin tuyển dụng </span>
        </Link>
      </Menu.Item>

      <Menu.Item key="profile-manager" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/profile-manager`}>
          <Icon type="solution"/>
          <span>Ứng viên</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="schedule" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/schedule`} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
          <div>
            <Icon type="calendar"/>
            <span>Lịch</span>
          </div>
          {props.count ? <Tag color="#ae0900">{props.count}</Tag> : null}
        </Link>
      </Menu.Item>

      <Menu.Item key="reminder" style={{display: 'flex', alignItems: 'center'}}>
        <Link to={`/reminder`} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
          <div>
            <Icon type="bell"/>
            <span>Nhắc nhở</span>
          </div>
        </Link>
      </Menu.Item>

      <SubMenu key="sub1" title={!props.hiddenLabel ? <span>CÀI ĐẶT</span> : <Icon type="setting"/>}>

        <Menu.Item key="account-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/account-manager`}>
            <Icon type="user"/>
            <span>Quản lý tài khoản </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="view-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/view-manager`}>
            <IoEyeSharp className="mr-2"/>
            <span>Quản lý View </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="api-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/api-manager`}>
            <FaUserLock className="mr-2"/>
            <span>Quản lý API </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="api-roles-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/api-roles-manager`}>
            <AiOutlineFolderView className="mr-2"/>
            <span>Quản lý API Roles  </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="view-roles-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/view-roles-manager`}>
            <AiOutlineFolderView className="mr-2"/>
            <span>Quản lý View Roles  </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="roles-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/roles-manager`}>
            <FaUsersCog className="mr-2"/>
            <span>Quản lý Roles </span>
          </Link>
        </Menu.Item>

      </SubMenu>

      <SubMenu key="sub2" title={!props.hiddenLabel ? <span>QUẢN LÝ DANH MỤC</span> : <Icon type="menu"/>}>

        <Menu.Item key="job-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/job-manager`}>
            <MdOutlineWorkOutline className="mr-2"/>
            <span>Vị trí công việc</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="skill-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/skill-manager`}>
            <GiSkills className="mr-2"/>
            <span>Kỹ năng công việc</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="joblevel-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/joblevel-manager`}>
            <FaRegUser className="mr-2"/>
            <span>Cấp bậc công việc </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="company-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/company-manager`}>
            <RiOrganizationChart className="mr-2"/>
            <span>Công ty </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="department-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/department-manager`}>
            <HiOutlineUserGroup className="mr-2"/>
            <span>Phòng ban </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="school-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/school-manager`}>
            <FaSchool className="mr-2"/>
            <span>Trường học</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="sourcecv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/sourcecv-manager`}>
            <AiOutlineLinkedin className="mr-2"/>
            <span>Nguồn ứng viên </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="statuscv-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/statuscv-manager`}>
            <AiOutlineCheckCircle className="mr-2"/>
            <span>Quy trình tuyển dụng </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="blacklist-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/blacklist-manager`}>
            <IoIosListBox className="mr-2"/>
            <span>Blacklist </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="reason-reject-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/reason-reject-manager`}>
            <AiOutlineMinusCircle className="mr-2"/>
            <span>Lý do loại</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="address-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/address-manager`}>
            <RiMapPin2Line className="mr-2"/>
            <span>Địa chỉ </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="talent-pool-manager" style={{display: 'flex', alignItems: 'center'}}>
          <Link to={`/talent-pool-manager`}>
            <MdOutlineSource className="mr-2"/>
            <span>Talent Pools </span>
          </Link>
        </Menu.Item>

      </SubMenu>

      <SubMenu key="sub3" title={!props.hiddenLabel ? <span>TALENT POOLS</span> : <RiFolderUserLine/>}>
        <Menu.Item key="search">
          <Search onChange={handleSearch}/>

        </Menu.Item>
        {talentPool?.map((item: any) => {
          return <Menu.Item key={item.id} style={{display: 'flex'}}>
            <Link to={`/talent-pool-manager/${item.id}`}
                  className='nav-element'>
              <Icon type="contacts"/>
              <span className="nav-element__content">{item.name} </span>
              <Badge style={{backgroundColor: '#818181'}} count={item.numberOfProfile} overflowCount={999}/>
              {/*<Avatar style={{ backgroundColor: '#818181' }} shape="square" size={25}>{item.count}</Avatar>*/}
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
