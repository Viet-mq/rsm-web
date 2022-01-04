import React from 'react';
import {CoverModal, CoverPage, Row} from './styled';
import {Spin} from 'antd';

interface TransferProps {
  type?: any,
  style?: any,
}

const Loading = ({type = "fullpage", style = {}}: TransferProps) => {

  if (type == 'inline') {
    return (
      <Row style={style}><Spin/></Row>
    )
  }

  if (type == 'modal') {
    return (
      <CoverModal style={{...style, position: "absolute"}}><Spin/></CoverModal>
    )
  }

  return (
    <CoverPage style={{...style, position: "fixed"}}>
      <Spin/>
    </CoverPage>
  );
}

export default Loading;
