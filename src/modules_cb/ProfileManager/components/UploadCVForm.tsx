import {RootState} from "../../../redux/reducers";

import React, {useRef, useState} from "react";
import {Button, Modal} from "antd";
import {showFormUploadCV, uploadCV, uploadListCV} from "../redux/actions";
import {connect, ConnectedProps} from "react-redux";
import {UploadCVRequest, UploadListCVRequest} from "../types";

const mapStateToProps = (state: RootState) => ({
  showFormUpload: state.profileManager.showFormUpload,
})

const connector = connect(mapStateToProps, {
  showFormUploadCV,
  uploadCV,
  uploadListCV

});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateUploadFormProps extends ReduxProps {
}

function UploadCVForm(props: CreateUploadFormProps) {
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const formItemStyle = {height: '60px'};
  const [file, setFile] = useState(null);
  // const fieldUpload = useRef<any>(null);
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
      profileId: props.showFormUpload.id_upload,
      file: file,
    });

    let reqList: UploadListCVRequest = ({
      file: file,
    });
    props.showFormUpload.show_upload ? (props.uploadCV(req)) : (props.uploadListCV(reqList));
  }

  function onBtnCancelClicked() {
    setCompensatoryDataSource([]);
    if(document.querySelector("#upload")) {
    (  document.querySelector("#upload") as any).value=''
    }
    props.showFormUploadCV(false);
  }

  console.log("propFdaf:", props)
  return (

    <Modal
      zIndex={2}
      title={props.showFormUpload.show_upload ? "Thêm CV" : "Thêm Danh sách CV"}
      visible={props.showFormUpload.show_upload || props.showFormUpload.show_upload_list}
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
      <form id="form-upload">
        <input id="upload"  type="file" style={{width: "100%", border: "1px solid"}}
               onChange={onFileChange}
               accept=".doc,.docx,.pdf,.xlsx"/>
      </form>

      <div style={{textAlign: "center", marginTop: "20px"}}>
        <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
          Thêm
        </Button>
        <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
          Hủy
        </Button>
      </div>

    </Modal>
  );
}

export default connector(UploadCVForm);
