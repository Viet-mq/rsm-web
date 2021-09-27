import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import {Col, Icon, Layout, Row} from 'antd';
import Header from './Header';
import commonStyled from './styled/commonStyled';
import env from 'src/configs/env';
import DetailProfileForm from "../../modules_cb/ProfileManager/components/DetailProfileForm";
import {RootState} from "../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";

const {Sider} = Layout;

const mapStateToProps = ( state :RootState) =>({
  showFormDetail:state.profileManager.showForm
})

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface LayoutProps extends ReduxProps{
  children: React.ReactNode;
}

const DefaultLayout = (props: LayoutProps) => {

  const screenWidth = document.documentElement.clientWidth;
  const [collapsed, setCollapsed] = useState(screenWidth <= env.tabletWidth ? true : false)
  const [colDetail,setColDetail]=useState({general:12,detail:12})
  function toggle() {
    setCollapsed(!collapsed)
  }

  useEffect(() => {

    function updateSize() {
      if (document.documentElement.clientWidth < env.desktopWidth) setCollapsed(true)
      else setCollapsed(false)
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);

  }, []);

  return (
    <commonStyled.Container>
      <Layout>
        <Layout>
          <Sider className="menu" trigger={null} collapsible collapsed={collapsed} width={250}>
            {}
            <div className="logo">
              {}
              {collapsed ? (<h1 className="collapsed-logo"/>) : null}
            </div>
            <Nav hiddenLabel={collapsed}/>
          </Sider>
          <Layout className="content">
            <Header>
              <Icon
                className="trigger-menu"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggle}
              />
            </Header>

            <Row>
              <Col span={props.showFormDetail?.show_detail?.general}>
                {props.children}
              </Col>

              <Col span={props.showFormDetail?.show_detail?.detail}>
                <DetailProfileForm/>
              </Col>
            </Row>

          </Layout>
        </Layout>
      </Layout>
    </commonStyled.Container>
  );

};

export default connector(DefaultLayout);
