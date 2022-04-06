import React, {useEffect, useState} from "react";
import ListProfile from "../components/list/ListProfile";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUploadListCV,} from "../redux/actions";
import CreateProfileForm from "../components/CreateProfileForm";
import Loading from "../../../components/Loading";
import UploadCVForm from "../components/UploadCVForm";
import {exportExcelFile} from "../redux/services/apis";
import {useLocation, useParams} from "react-router-dom";
import {getDetailTalentPool} from "../../TalentPoolManager/redux/actions";
import {RecruitmentTalentPool} from "../types";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {profile_path} from "../../../helpers/utilsFunc";


const mapStateToProps = (state: RootState) => {
  return {
    profileManager: state.profileManager,
    talentPools: state.talentPoolManager,
  };
};

const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUploadListCV,
  getDetailTalentPool
});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function ProfileManagerPages(props: IProps) {
  const {search, create, uploadListCV, list} = props.profileManager
  const {idTalentPool} = useParams()
  const location = useLocation();
  const [dataID, setDataID] = useState<any>()
  useEffect(() => {
    if (location.pathname.includes("talent-pool-manager")) {
      document.title = "Talent pools"
      props.getDetailTalentPool({id: idTalentPool})

    } else document.title = "Ứng viên";
  }, []);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }

    let req: RecruitmentTalentPool = ({
      talentPool: idTalentPool,

    })
    props.showFormCreate(true, req);
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
    exportExcelFile(dataID).then((value: any) => {
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
              className="tmp-title-page-size20">{location.pathname.includes("talent-pool-manager") ? `${props.talentPools.detail.result ? props.talentPools.detail.result[0]?.name : ""} ` : "Ứng viên "}({search.rowsSearchFull ? search.rowsSearchFull.length : list.total})
            </div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div style={{display: "flex", flexWrap: "nowrap"}}>
                <ButtonCreate path={profile_path} action="create" name=" Thêm ứng viên" handleClick={handleCreate}/>

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

      <ListProfile idTalentPool={idTalentPool} dataID={dataID} setDataID={setDataID}/>
      <CreateProfileForm/>
      <UploadCVForm/>

      {create.loading ||
      uploadListCV.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(ProfileManagerPages);
