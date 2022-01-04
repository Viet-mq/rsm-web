import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Col, Form, Input, Row} from "antd";
import ChatBotSelector from 'src/components/ChatBotSelector'
import {connect, ConnectedProps} from "react-redux";
import {getListIntent, setChatBotSelected} from "../redux/actions";
import {ChatBot} from "../../ChatBotManager/types";
import {RootState} from "../../../redux/reducers";

const SearchForm = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const mapStateToProps = ({chatBotManager: {selector_bot}}: RootState) => ({selector_bot})
const connector = connect(mapStateToProps, {getListIntent, setChatBotSelected});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListingHeader(props: IProps) {

  const [keySearch, setKeySearch] = useState('');

  function handleSearch(e: any) {
    let params = {
      chatbot_id: props.selector_bot.bot_id,
      intent_name: keySearch,
      page: 1,
      size: 100
    };
    props.getListIntent(params);
  }

  function onChatBotChange(e: any) {
  }

  const onChatBotSelected = (cb: ChatBot) => {
    props.setChatBotSelected(cb);
  }

  return (
    <SearchForm>
      <Form>
        <Row className="row">
          <Col xs={24} sm={12} xl={6}>
            <Form.Item hasFeedback>
              <ChatBotSelector placeholder="Chọn chat bot"
                               allowEmpty={true}
                               onChange={onChatBotChange}
                               onSelected={onChatBotSelected}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} xl={6}>
            <Form.Item hasFeedback>
              <Input value={keySearch} onChange={(e: any) => {
                setKeySearch(e.target.value)
              }} placeholder='Search Text'/>
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

export default connector(ListingHeader);

