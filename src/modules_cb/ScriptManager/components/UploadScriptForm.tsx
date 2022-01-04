import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Modal, Upload} from "antd";
import React, {useState} from "react";
import {createScript, showFormUpLoadScript} from "../redux/actions";
import {UploadOutlined} from '@ant-design/icons';

const mapStateToProps = ({scriptManager, chatBotManager}: RootState) => ({scriptManager, chatBotManager});
const connector = connect(mapStateToProps, {showFormUpLoadScript, createScript});

type ReduxProps = ConnectedProps<typeof connector>;

interface UploadScriptFormProps extends FormComponentProps, ReduxProps {
}

function UploadScriptForm(props: UploadScriptFormProps) {

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

  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<any>([]);

  const handleUpload = (e: any) => {

  }


  return (

    <Modal
      zIndex={100}
      maskClosable={false}
      title="Upload kịch bản"
      visible={props.scriptManager.show_form.show_upload}
      centered={true}
      width="550px"
      afterClose={() => {
      }}
      onCancel={() => {
        props.showFormUpLoadScript(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Upload
          multiple={false}
          beforeUpload={(file, fileList) => {
            setFileList(fileList);
            return false
          }}
        >
          <Button><UploadOutlined/>Chọn file kịch bản upload</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{marginTop: 16}}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<UploadScriptFormProps>()(UploadScriptForm));
