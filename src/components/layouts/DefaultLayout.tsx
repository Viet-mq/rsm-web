import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import {Avatar, Col, Form, Icon, Layout, Row, Select} from 'antd';
import Header from './Header';
import commonStyled from './styled/commonStyled';
import env from 'src/configs/env';
import DetailProfileForm from "../../modules_cb/ProfileManager/components/DetailProfileForm";
import {RootState} from "../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {getElasticSearch, getFullElasticSearch} from "../../modules_cb/ProfileManager/redux/actions";
import {useHistory} from "react-router-dom";
import Loading from "../Loading";

const {Sider} = Layout;
const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showFormDetail: state.profileManager.showForm,
  elasticSearch: state.profileManager.search,

})

const connector = connect(mapStateToProps, {
  getElasticSearch,
  getFullElasticSearch
});

type ReduxProps = ConnectedProps<typeof connector>;

interface LayoutProps extends FormComponentProps, ReduxProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: LayoutProps) => {
  const screenWidth = document.documentElement.clientWidth;
  const [collapsed, setCollapsed] = useState(screenWidth <= env.tabletWidth ? true : false)
  const history = useHistory();
  const [search, setSearch] = useState<any>({
    value: undefined,
    dataSource: [],
  });

  const getInitials = (name: string) => {
    if (name) {
      let initials: any = name.split(' ');
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }
      return initials.toUpperCase();
    }
  }

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

  useEffect(() => {
    if (search.value) {
      props.getElasticSearch({key: search.value, size: 10})
    } else setSearch({
      value: undefined,
      dataSource: []
    })
  }, [search.value])

  useEffect(() => {
    const addIdForValue = [
      {
        id: search.value,
        fullName: search.value,
        email: ''
      }
    ]
    setSearch({
      ...search,
      dataSource: search.value ? addIdForValue.concat(props.elasticSearch.rowsSearch) : [],
    })
  }, [props.elasticSearch.rowsSearch])

  function onSearch(value: any) {
    setSearch({
      ...search,
      value
    })
  }

  function onSelect(value: any) {
    console.log("select:", value)
    setSearch({
      ...search,
      value: props.elasticSearch.rowsSearch?.find((item: any) => item.id === value)?.fullName,
    })
    props.getFullElasticSearch({key: value, size: 100})
    history.push({
      pathname: "/profile-manager",
    });
  }

  return (
    <div>
      <commonStyled.Container>
        <Layout>
          <Layout>
            <Sider className="menu" trigger={null} collapsible collapsed={collapsed} width={250}>
              {}
              <div className="logo">
                {collapsed ? null : <img src={require('src/assets/images/logo-edsolabs.png')}/>
                }
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
                <span className="ml-5" style={{fontWeight: 500, marginRight: '-21px'}}>Tìm kiếm</span>

                <Form style={{
                  display: "flex", flexWrap: "wrap", marginLeft: "25px", flex: "1"
                }}>

                  <Form.Item style={{margin: "-5px 10px 0 5px", width: "40%"}}>
                    <>
                      <div style={{display: "flex"}}>

                        <Select
                          showSearch
                          value={search.value}
                          placeholder={"Họ tên, Năm sinh, Quê quán, Trường học, Số điện thoại, Email, Công việc"}
                          defaultActiveFirstOption={false}
                          showArrow={false}
                          filterOption={false}
                          onSearch={onSearch}
                          onSelect={onSelect}
                          notFoundContent={null}
                          optionLabelProp="label"
                        >
                          {search.dataSource?.map((item: any) => {
                              return <Option key={item.id} value={item.id} label={item.fullName}>
                                {item.email ?
                                  <div className="flex-items-center" style={{paddingTop: 5}}>
                                    <div style={{marginRight: 10}}>
                                      <Avatar src={item.image ? item.image : "#"}
                                              style={{backgroundColor: item?.avatarColor, marginRight: 5}}>
                                        {getInitials(item.fullName)}
                                      </Avatar>
                                    </div>
                                    <div className="c-list-profile" style={{fontWeight: 500}}>
                                      <div style={{height: 25}}>{item.fullName}</div>
                                      <div style={{height: 25}} className="more-information">{item.email}</div>
                                    </div>
                                  </div>

                                  :
                                  <div>{item.fullName}</div>
                                }

                              </Option>
                            }
                          )}
                        </Select>
                      </div>

                    </>
                  </Form.Item>
                </Form>
              </Header>

              <div>
                <Row>
                  <Col span={props.showFormDetail?.show_detail?.general}
                       style={{height: "calc(100vh - 60px)", overflow: "auto"}}>
                    <div style={history.location.pathname === '/statuscv-manager' ? {
                      background: "white",
                      height: "100%"
                    } : {height: "100%"}}>
                      {props.children}
                    </div>
                  </Col>

                  <Col span={props.showFormDetail?.show_detail?.detail}>
                    <DetailProfileForm/>
                  </Col>
                </Row>
              </div>
            </Layout>

          </Layout>
        </Layout>
      </commonStyled.Container>

      {props.elasticSearch.loadingRs ? <Loading/> : null}
    </div>
  );

};

export default connector(Form.create<LayoutProps>()(DefaultLayout));
