import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import {AutoComplete, Button, Col, Form, Icon, Layout, Row} from 'antd';
import Header from './Header';
import commonStyled from './styled/commonStyled';
import env from 'src/configs/env';
import DetailProfileForm from "../../modules_cb/ProfileManager/components/DetailProfileForm";
import {RootState} from "../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {getElasticSearch, triggerSearch} from "../../modules_cb/ProfileManager/redux/actions";
import {useHistory} from "react-router-dom";
import Loading from "../Loading";

const {Sider} = Layout;

const mapStateToProps = (state: RootState) => ({
  showFormDetail: state.profileManager.showForm,
  elasticSearch: state.profileManager.search,

})

const connector = connect(mapStateToProps, {
  getElasticSearch,
  triggerSearch
});

type ReduxProps = ConnectedProps<typeof connector>;

interface LayoutProps extends FormComponentProps, ReduxProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: LayoutProps) => {

  const screenWidth = document.documentElement.clientWidth;
  const [collapsed, setCollapsed] = useState(screenWidth <= env.tabletWidth ? true : false)
  const {getFieldDecorator, resetFields} = props.form;
  const [isLoading,setIsLoading]=useState(false)
  const history = useHistory();
  const [state, setState] = useState<any>({
    value: '',
    dataSource: [],
  });
const [rowsSearch,setRowsSearch]=useState<string[]|any>([])

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
    if (state.value) {
      props.getElasticSearch({key: state.value, size: 10})
    }
  }, [state.value])

  useEffect(() => {
    if (props.elasticSearch.rowsRs && state.value) {
      history.push({
        pathname: "/profile-manager",
      });
      setIsLoading(false)
    }
  }, [props.elasticSearch.triggerSearch])

  function onChange(value: any) {
    console.log('onChange', value);
    setState({
      ...state,
      value
    })
  }

  useEffect(()=>{
    setState({
      ...state,
      dataSource: !state.value ? [] : Array.from(new Set([state.value ].concat(props.elasticSearch.rowsSearch?.map((item: any) => item.fullName)))) ,
    })
  },[props.elasticSearch.rowsSearch])

  function onSelect(value:any) {
    console.log('onSelect', value);
    if(value){
      props.getElasticSearch({key: value, size: 100})
      props.triggerSearch();
    }
    if(state.value){
      setIsLoading(true);
    }
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
                        <AutoComplete
                          dataSource={state.dataSource}
                          style={{width: 400}}
                          onChange={onChange}
                          onSelect={onSelect}
                          // onSearch={onSearch}
                          placeholder={"Họ tên, Năm sinh, Quê quán, Trường học, Số điện thoại, Email, Công việc"}
                        >
                        </AutoComplete>
                      </div>

                    </>
                </Form.Item>
              </Form>
            </Header>

            <div>
              <Row>
                <Col span={props.showFormDetail?.show_detail?.general}
                     style={{height: "calc(100vh - 60px)", overflow: "auto"}}>
                  {props.children}
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

      {props.elasticSearch.loadingRs?<Loading/>:null}
    </div>
  );

};

export default connector(Form.create<LayoutProps>()(DefaultLayout));
