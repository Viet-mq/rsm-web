import React, {useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Row} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import Styled from './../styled/loginStyled';

interface IProps extends FormComponentProps {
  onLogin(username: string, password: string): void;

  loading: boolean;
}

export const Login = (props: IProps) => {

  const {getFieldDecorator} = props.form;
  const [data, setData] = useState({remember: true});

  const onCheckRememberPasswordChange = () => {
    setData({
      ...data,
      remember: !data.remember,
    });
  }

  const onLoginFormSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onLogin(values.username, values.password);
      }
    });
  };

  return (
    <Styled.Container>
      <div className="logo">
      </div>
      <div className="loginContent">
        <Row gutter={16}>
          <Col span={24}>
            <h3 className="title">Đăng nhập</h3>
            <Form onSubmit={onLoginFormSubmit}>
              <Form.Item label="Tên đăng nhập">
                {getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng điền tên đăng nhập',
                    },
                  ],
                  normalize: value => value.trim(),
                })(<Input autoFocus={true} placeholder="Nhập tên đăng nhập"/>)}
              </Form.Item>
              <Form.Item label="Mật khẩu">
                {getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng điền mật khẩu',
                    },
                  ],
                })(<Input type="password" placeholder="Nhập mật khẩu"/>)}
              </Form.Item>
              <Form.Item>
                <Checkbox checked={data.remember} onChange={onCheckRememberPasswordChange}>
                  Lưu mật khẩu
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button block={true} type="primary" htmlType="submit" disabled={props.loading}>
                  {props.loading ? 'Vui lòng đợi...' : 'Đăng nhập'}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Styled.Container>
  );
};

export default Form.create<IProps>()(Login);
