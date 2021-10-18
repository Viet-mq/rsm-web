import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Col, Form, Input, Row, Select} from "antd";
import ChatBotSelector from 'src/components/ChatBotSelector'

const SearchForm = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

function ListingHeader() {

  const [status, setStatus] = useState('');
  const [chatBotId, setChatBotId] = useState('');

  function handleReset() {

  }

  function onParamsSearch(params: any) {

  }

  function handleSearch(e: any) {

  }

  function onChatBotChange(e: any) {
    setChatBotId(e);
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
                               onChange={onChatBotChange}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} xl={6}>
            <Form.Item hasFeedback>
              <Input placeholder='Search Text'/>
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

export default ListingHeader;

