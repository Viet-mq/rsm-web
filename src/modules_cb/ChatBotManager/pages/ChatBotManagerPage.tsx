import React, {useEffect} from "react";
import {Button, Col, Icon, Row, Tabs} from 'antd';
import CreateChatBotForm from '../components/CreateChatBotForm'
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getListChatBots, showCreateChatBotForm} from "../redux/actions";
import Loading from "../../../components/Loading";
import ListChatBot from "./ListChatBot";
import UpdateChatBotForm from "../components/UpdateChatBotForm";

const {TabPane} = Tabs;

const mapState = ({
                    chatBotManager: {
                      formCreate,
                      createState,
                      list,
                      deleteChatBot,
                      updateChatBotState
                    },
                  }: RootState) => ({
  formCreate,
  createState,
  list,
  deleteChatBot,
  updateChatBotState
});
const connector = connect(mapState, {showCreateChatBotForm, getListChatBots});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ChatBotManagerPage(props: IProps) {

  useEffect(() => {
    document.title = "ChatBot Manager";
    props.getListChatBots({});
  }, []);

  function callback(key: any) {
    console.log(key);
  }

  function onCreateResponse(result: number) {
    console.log("result = " + result);
  }

  function handleCreate(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showCreateChatBotForm();
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý chat bot</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Chatbot
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Thông tin chung" key="1">
          <ListChatBot/>
        </TabPane>
        <TabPane tab="Import/Export" key="2">
          Import/Export
        </TabPane>
        <TabPane tab="Chia sẻ" key="3">
          Chia sẻ
        </TabPane>
      </Tabs>

      <CreateChatBotForm/>
      <UpdateChatBotForm/>

      {props.createState.loading || props.list.loading || props.deleteChatBot.loading || props.updateChatBotState.loading ?
        <Loading/> : null}

    </div>
  );
}

export default connector(ChatBotManagerPage);
