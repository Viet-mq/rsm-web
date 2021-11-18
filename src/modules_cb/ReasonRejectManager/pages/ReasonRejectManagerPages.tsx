import React, {useEffect} from "react";
import ListReasonReject from "../components/list/ListReasonReject";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateReasonRejectForm from "../components/CreateReasonRejectForm";
import Loading from "../../../components/Loading";
import UpdateReasonRejectForm from "../components/UpdateReasonRejectForm";

const mapStateToProps = ({
                           reasonRejectManager: {
                             showForm,
                             list,
                             create,
                             deleteReasonReject,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteReasonReject,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}
function ReasonRejectManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý lý do từ chối";
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
            <div className="tmp-title-page-size20">Quản lý lý do từ chối</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo lý do
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListReasonReject/>

      <CreateReasonRejectForm/>
      <UpdateReasonRejectForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteReasonReject.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(ReasonRejectManagerPages);
