import React, {useEffect} from "react";
import ListTalentPool from "../components/list/ListTalentPool";
import {Col, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateTalentPoolForm from "../components/CreateTalentPoolForm";
import Loading from "../../../components/Loading";
import UpdateTalentPoolForm from "../components/UpdateTalentPoolForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {talent_pool_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({
                           talentPoolManager: {
                             showForm,
                             list,
                             create,
                             deleteTalentPool,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteTalentPool,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function TalentPoolManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý Kho tiềm năng";
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
            <div className="tmp-title-page-size20">Quản lý Kho tiềm năng</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <ButtonCreate path={talent_pool_path} action="create" name=" Thêm kho tiềm năng"
                              handleClick={handleCreate}/>

              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListTalentPool/>
      <CreateTalentPoolForm/>
      <UpdateTalentPoolForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteTalentPool.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(TalentPoolManagerPages);
