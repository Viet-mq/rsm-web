import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Col, Form, Row, Select} from "antd";
import ChatBotSelector from 'src/components/ChatBotSelector'
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {EntityListParams, getListChatBotEntity, setChatBotId} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {ChatBot} from "../../ChatBotManager/types";

const SearchForm = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const mapStateToProps = ({entityManager: {list}}: RootState) => ({list});
const connector = connect(mapStateToProps, {setChatBotId, getListChatBotEntity});

type ReduxProps = ConnectedProps<typeof connector>;

interface HeaderBarFormProps extends FormComponentProps, ReduxProps {
}

function HeaderBarEntity(props: HeaderBarFormProps) {

  const [chatBotId, setChatBotId] = useState('');

  function handleReset() {

  }

  function handleSearch(e: any) {
    let params: EntityListParams = {
      chatbot_id: chatBotId,
      page: 1,
      size: 100
    };
    props.getListChatBotEntity(params);
  }

  function onChatBotChange(e: any) {
    setChatBotId(e);
  }

  const onChatBotSelected = (cb: ChatBot) => {
    props.setChatBotId(cb);
  }

  return (
    <SearchForm>
      <Form>
        <Row className="row">
          <Col xs={24} sm={12} xl={6}>
            <Form.Item hasFeedback>
              <ChatBotSelector placeholder="Chọn chat bot"
                               allowEmpty={true}
                               value={chatBotId}
                               allLabel="Chọn chat bot"
                               onChange={onChatBotChange}
                               onSelected={onChatBotSelected}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} xl={4}>
            <Form.Item>
              <Row className="row">
                <Col xs={12}>
                  <Button style={{width: '100%'}} className="create-btn" onClick={(e: any) => handleSearch(e)}>
                    Tìm kiếm
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SearchForm>
  )
}

export default connector(Form.create<HeaderBarFormProps>()(HeaderBarEntity));

