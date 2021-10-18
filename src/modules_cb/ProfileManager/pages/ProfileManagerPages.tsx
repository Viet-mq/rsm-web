import React, {useEffect} from "react";
import ListProfile from "../components/list/ListProfile";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  showFormBooking,
  showFormCreate,
  showFormUpdate,
  showFormUploadCV
} from "../redux/actions";
import CreateProfileForm from "../components/CreateProfileForm";
import Loading from "../../../components/Loading";
import UpdateProfileForm from "../components/UpdateProfileForm";
import UploadCVForm from "../components/UploadCVForm";
import BookingForm from "../components/BookingForm";
import UpdateDetailProfileForm from "../components/UpdateDetailProfileForm";

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
                             updateDetail
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
  updateDetail
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate, showFormUploadCV, showFormBooking});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ProfileManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý Profile";
  }, []);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  return (
    <div className="contentPage">

      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý Profile</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Profile
                </Button>
                <Button >
                  <Icon type="upload"/> Upload CV
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
