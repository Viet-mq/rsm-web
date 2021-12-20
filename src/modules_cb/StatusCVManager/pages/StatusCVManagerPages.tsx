import React, {useEffect} from "react";
import ListStatusCV from "../components/list/ListStatusCV";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateStatusCVForm from "../components/CreateStatusCVForm";
import Loading from "../../../components/Loading";
import UpdateStatusCVForm from "../components/UpdateStatusCVForm";

const mapStateToProps = ({
                           statuscvManager: {
                             showForm,
                             list,
                             create,
                             deleteStatusCV,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteStatusCV,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function StatusCVManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý quy trình tuyển dụng";
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
            <div className="tmp-title-page-size20">Quản lý quy trình tuyển dụng</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Thêm vòng tuyển dụng
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListStatusCV/>

      <CreateStatusCVForm/>
      <UpdateStatusCVForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteStatusCV.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(StatusCVManagerPages);
