import React, {useEffect} from "react";
import ListProfile from "../components/list/ListProfile";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  showFormBooking,
  showFormCreate,
  showFormUpdate,
  showFormUploadCV,
  showFormUploadListCV,
} from "../redux/actions";
import CreateProfileForm from "../components/CreateProfileForm";
import Loading from "../../../components/Loading";
import UpdateProfileForm from "../components/UpdateProfileForm";
import UploadCVForm from "../components/UploadCVForm";
import BookingForm from "../components/BookingForm";
import UpdateDetailProfileForm from "../components/UpdateDetailProfileForm";
import {exportExcelFile} from "../redux/services/apis";

const mapStateToProps = ({
                           profileManager: {
                             showForm,
                             list,
                             create,
                             deleteProfile,
                             update,
                             uploadCV,
                             showFormUpload,
                             getBooking,
                             createBooking,
                             updateBooking,
                             updateDetail,
                             uploadListCV,

                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteProfile,
  update,
  uploadCV,
  showFormUpload,
  getBooking,
  createBooking,
  updateBooking,
  updateDetail,
  uploadListCV
})
const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUpdate,
  showFormUploadCV,
  showFormBooking,
  showFormUploadListCV
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function ProfileManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Ứng viên";
  }, []);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  const handleUploadListCV = (e: any) => {
    e.stopPropagation();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadListCV(true);
  }

  function BtnExportExcel() {
    exportExcelFile(undefined).then((value: any) => {
      var data = new Blob([value], {type: 'application/json'});
      var xlsxURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = xlsxURL;
      tempLink.setAttribute('download', 'file.xlsx');
      tempLink.click();
    });
  }

  return (
    <div className="contentPage">

      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Ứng viên ({props.list.total})</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div style={{display: "flex", flexWrap: "nowrap"}}>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Thêm ứng viên
                </Button>
                <Button onClick={event => handleUploadListCV(event)}>
                  <Icon type="upload"/> Upload DS ứng viên
                </Button>
                <Button>
                  <a onClick={BtnExportExcel}><Icon type="export"/> Xuất Excel</a>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListProfile/>
      <CreateProfileForm/>
      <UpdateProfileForm/>
      <UploadCVForm/>
      <BookingForm/>
      <UpdateDetailProfileForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteProfile.loading ||
      props.uploadCV.loading ||
      props.uploadListCV.loading ||
      props.update.loading ||
      props.updateDetail.loading ||
      props.getBooking.loading ||
      props.createBooking.loading ||
      props.updateBooking.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(ProfileManagerPages);
