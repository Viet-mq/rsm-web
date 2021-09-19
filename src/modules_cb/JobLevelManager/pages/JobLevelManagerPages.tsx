import React, {useEffect} from "react";
import ListJobLevel from "../components/list/ListJobLevel";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateJobLevelForm from "../components/CreateJobLevelForm";
import Loading from "../../../components/Loading";
import UpdateJobLevelForm from "../components/UpdateJobLevelForm";

const mapStateToProps = ({
                           joblevelManager: {
                             showForm,
                             list,
                             create,
                             deleteJobLevel,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteJobLevel,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function JobLevelManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý job level";
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
            <div className="tmp-title-page-size20">Quản lý job level</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo job level
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListJobLevel/>

      <CreateJobLevelForm/>
      <UpdateJobLevelForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteJobLevel.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(JobLevelManagerPages);
