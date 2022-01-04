import React, {useEffect, useState} from "react";
import {Button, Col, Icon, Row} from "antd";
import {NotificationSuccess} from "src/components/Notification/Notification";
import ChatBotSelector from 'src/components/ChatBotSelector'
import styled from "styled-components";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import CreateScriptForm from "../components/CreateScriptForm";
import {getListScript, getListScriptSuccess, showFormCreateScript, showFormUpLoadScript} from "../redux/actions";
import Loading from "../../../components/Loading";
import ListScript from "../components/ListScript";
import SettingScript from "../components/SettingScript";
import CreateStepForm from "../components/CreateStepForm";
import UploadScriptForm from "../components/UploadScriptForm";

const SelectBotForm = styled.div`
  margin-top: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const mapStateToProps = ({chatBotManager: {selector_bot}, scriptManager: {create, list}}: RootState) => ({
  selector_bot,
  create,
  list
});
const connector = connect(mapStateToProps, {
  showFormCreateScript,
  getListScript,
  getListScriptSuccess,
  showFormUpLoadScript
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ScriptManagerPage(props: IProps) {

  const [chatBotId, setChatBotId] = useState('');

  useEffect(() => {
    document.title = "Quản lý kịch bản";
    if (props.selector_bot.bot_id !== undefined && props.selector_bot.bot_id !== null && props.selector_bot.bot_id !== "") {
      let params = props.list.params || {};
      params.chatbot_id = props.selector_bot.bot_id;
      params.page = 0;
      params.size = 100;
      props.getListScript(params);
    }
  }, []);

  const handleCreate = () => {
    if (!props.selector_bot.bot_entity) {
      NotificationSuccess("Thông báo", "Vui lòng chọn 1 Chat Bot");
      return;
    }
    props.showFormCreateScript(true);
  }

  const handleTraining = () => {
    NotificationSuccess("Thông báo", "Coming soon");
  }

  const handleUpload = () => {
    if (!props.selector_bot.bot_entity) {
      NotificationSuccess("Thông báo", "Vui lòng chọn 1 Chat Bot");
      return;
    }
    props.showFormUpLoadScript(true);
  }

  const onChatBotChange = (e: any) => {
    setChatBotId(e);
    // load all script of bot
    if (e === undefined || e === null || e === "") {
      props.getListScriptSuccess([], 0);
    } else {
      let params = props.list.params || {};
      params.chatbot_id = e;
      params.page = 0;
      params.size = 100;
      props.getListScript(params);
    }
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={8}>
            <div className="tmp-title-page-size20">Quản lý kịch bản</div>
          </Col>
          <Col className="d-flex" md={16}>
            <div className="tmp-btn">
              <div>
                <SelectBotForm>
                  <ChatBotSelector placeholder="Chọn chat bot"
                                   allowEmpty={true}
                                   value={chatBotId}
                                   onChange={onChatBotChange}/>
                </SelectBotForm>

              </div>
            </div>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleTraining}>
                  <Icon type="apartment"/> Huấn luyện
                </Button>
              </div>
            </div>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleUpload}>
                  <Icon type="upload"/> Upload kịch bản
                </Button>
              </div>
            </div>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="edit"/> Thêm kịch bản
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md={6}>
            <ListScript/>
          </Col>
          <Col md={18}>
            <SettingScript/>
          </Col>
        </Row>
      </div>

      <CreateScriptForm/>

      <CreateStepForm/>

      <UploadScriptForm/>

      {props.create.loading ? <Loading/> : null}

    </div>

  );

}

export default connector(ScriptManagerPage);
