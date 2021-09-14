import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/redux/reducers';

import styled from 'styled-components';
import {Icon, Col, Row, Button} from 'antd';

const Wrapper = styled.div.attrs({
  className: 'entryHeader',
})`
    padding: 15px 0;
`

const Title = styled.div`
  margin: 0;
  font-size: 18px;
`;

const mapState = ({auth: {auth}}: RootState) => ({
  auth,
});

const connector = connect(mapState, {
});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  showButton?: any,
  selectedItems?: any,
}

function Header(props: IProps) {

  function handleCreateDayOff() {
  }

  function handleCreateForgotCheckin() {
  }

  function handleCreateOT() {
  }

  function handleCreateWorkingOutside() {
  }

  return (
    <Wrapper>
      <Row>
        <Col md={8}>
          <Title>Chúc bạn một ngày làm việc hiệu quả</Title>
        </Col>
        <Col className="d-flex" md={16}>
          {window.location.pathname.split('/').length <= 3 && <div className="tmp-btn">
            <Button onClick={handleCreateDayOff}>
              <Icon type="plus"/> Tạo lịch nghỉ
            </Button>
            <Button onClick={handleCreateForgotCheckin}>
              <Icon type="plus"/> Tạo yêu cầu điểm danh
            </Button>
            <Button onClick={handleCreateOT}>
              <Icon type="plus"/> Tạo yêu cầu đi làm cuối tuần
            </Button>
            <Button onClick={handleCreateWorkingOutside}>
              <Icon type="plus"/> Tạo yêu cầu làm việc ngoài cơ quan
            </Button>
          </div>}
        </Col>
      </Row>
    </Wrapper>
  );
}

export default connector(Header);
