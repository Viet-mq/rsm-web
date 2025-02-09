import React, {useEffect} from "react";
import ListJob from "../components/list/ListJob";
import {Col, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateJobForm from "../components/CreateJobForm";
import Loading from "../../../components/Loading";
import UpdateJobForm from "../components/UpdateJobForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {job_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({
                           jobManager: {
                             showForm,
                             list,
                             create,
                             deleteJob,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteJob,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function JobManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý vị trí công việc";
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
            <div className="tmp-title-page-size20">Quản lý vị trí công việc</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <ButtonCreate path={job_path} action="create" name=" Tạo vị trí công việc" handleClick={handleCreate}/>

              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListJob/>

      <CreateJobForm/>
      <UpdateJobForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteJob.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(JobManagerPages);
