import {RootState} from "../../../redux/reducers";
import React, {useState} from "react";
import {Button, Modal} from "antd";
import {connect, ConnectedProps} from "react-redux";
import {showFormUploadAvatar, uploadAvatar} from "../redux/actions";
import {UploadAvatarRequest} from "../types";
import Loading from "../../../components/Loading";

const mapStateToProps = (state: RootState) => ({
  showUploadAvatar: state.profileManager.showForm,
  uploadAvatar:state.profileManager.uploadAvatar
})

const connector = connect(mapStateToProps, {
  uploadAvatar,
  showFormUploadAvatar
});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateUploadFormProps extends ReduxProps {
}

function UploadAvatarForm(props: CreateUploadFormProps) {

  const [file, setFile] = useState(null);
  console.log("shwoww:",props.showFormUploadAvatar)
  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log("file:", e.target.files[0]);
  }

  function onBtnCreateClicked(e: any) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;

    let req: UploadAvatarRequest = ({
      profileId: props.showUploadAvatar.id_upload_avatar,
      image: file,
    });
    props.uploadAvatar(req);
    if (document.querySelector("#upload")) {
      (document.querySelector("#upload") as any).value = ''
    }
    console.log("Avatar:", req)
  }

  function onBtnCancelClicked() {
    if (document.querySelector("#upload")) {
      (document.querySelector("#upload") as any).value = ''
    }
    props.showFormUploadAvatar(false);
  }

  return (
    <>
      <Modal
        zIndex={2}
        title="Cập nhật ảnh đại diện"
        visible={props.showUploadAvatar.show_upload_avatar}
        centered={true}
        width="550px"
        footer={""}
        afterClose={() => {
        }}
        onCancel={() => {
          props.showFormUploadAvatar(false);
        }}
      >
        <form id="form-upload">
          <input id="upload" type="file" style={{width: "100%", border: "1px solid"}}
                 onChange={onFileChange}
                 accept=".jpg,.jpeg,.png,.svg"/>
        </form>

        <div style={{textAlign: "center", marginTop: "20px"}}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Cập nhật
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </div>

      </Modal>

      {props.uploadAvatar.loading ? <Loading/> : null}

    </>
  );
}

export default connector(UploadAvatarForm);
