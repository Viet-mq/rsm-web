import React, {useEffect} from "react";
import ListTalentPool from "../components/list/ListTalentPool";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateTalentPoolForm from "../components/CreateTalentPoolForm";
import Loading from "../../../components/Loading";
import UpdateTalentPoolForm from "../components/UpdateTalentPoolForm";

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
    document.title = "Quản lý Talent Pool";
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
            <div className="tmp-title-page-size20">Quản lý Talent Pool</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Talent Pool
                </Button>
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
