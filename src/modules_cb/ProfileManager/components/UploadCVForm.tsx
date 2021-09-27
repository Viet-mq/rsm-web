import {RootState} from "../../../redux/reducers";

import React, {useState} from "react";
import {Button, Input, Modal} from "antd";
import {showFormUploadCV, uploadCV} from "../redux/actions";
import {connect, ConnectedProps} from "react-redux";
import {UploadCVRequest} from "../types";

const mapStateToProps = (state: RootState) => ({
  showFormUpload: state.profileManager.showFormUpload,
})

const connector = connect(mapStateToProps, {showFormUploadCV, uploadCV});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateUploadFormProps extends ReduxProps {
}

function UploadCVForm(props: CreateUploadFormProps) {
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const formItemStyle = {height: '60px'};
  const [file, setFile] = useState(null);

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };
  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log("file:", e.target.files[0]);
  }

  function onBtnCreateClicked(e: any) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    let req: UploadCVRequest = ({
      profileId: props.showFormUpload.data_upload?.id || '',
      file: file,
    });
    props.uploadCV(req);
  }

  function onBtnCancelClicked() {
    setCompensatoryDataSource([]);
    props.showFormUploadCV(false);
  }

  return (

    <Modal
      zIndex={2}
      title="Thêm CV"
      visible={props.showFormUpload.show_upload}
      centered={true}
      width="550px"
      footer={""}
      afterClose={() => {
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        setCompensatoryDataSource([]);
        props.showFormUploadCV(false);
      }}
    >

      <Input type="file" onChange={onFileChange} accept=".doc,.docx,.pdf"/>

      <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
        Thêm
      </Button>
      <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
        Hủy
      </Button>

    </Modal>
  );
}

export default connector(UploadCVForm);
