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
import {useLocation, useParams} from "react-router-dom";
import {getDetailTalentPool} from "../../TalentPoolManager/redux/actions";


const mapStateToProps = (state: RootState) => {
  return {
    profileManager: state.profileManager,
    talentPools: state.talentPoolManager,
  };
};

const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUpdate,
  showFormUploadCV,
  showFormBooking,
  showFormUploadListCV,
  getDetailTalentPool
});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function ProfileManagerPages(props: IProps) {
  const {idTalentPool} = useParams()
  const location = useLocation();
  useEffect(() => {
    location.pathname.includes("talent-pool-manager") ? document.title = "Talent pools" : document.title = "Ứng viên";
    props.getDetailTalentPool({id: idTalentPool})
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
      const data = new Blob([value], {type: 'application/json'});
      const xlsxURL = window.URL.createObjectURL(data);
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
            <div
              className="tmp-title-page-size20">{location.pathname.includes("talent-pool-manager") ? `${props.talentPools.detail.result ? props.talentPools.detail.result[0]?.name : ""} ` : "Ứng viên "}({props.profileManager.list.total})
            </div>
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

      <ListProfile idTalentPool={idTalentPool}/>
      <CreateProfileForm/>
      <UpdateProfileForm/>
      <UploadCVForm/>
      <BookingForm/>
      <UpdateDetailProfileForm/>

      {props.profileManager.create.loading ||
      props.profileManager.list.loading ||
      props.profileManager.deleteProfile.loading ||
      props.profileManager.uploadCV.loading ||
      props.profileManager.uploadListCV.loading ||
      props.profileManager.update.loading ||
      props.profileManager.updateDetail.loading ||
      props.profileManager.getBooking.loading ||
      props.profileManager.createBooking.loading ||
      props.profileManager.updateBooking.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(ProfileManagerPages);
