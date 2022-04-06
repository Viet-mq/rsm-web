import React, {useEffect} from "react";
import ListReasonReject from "../components/list/ListReasonReject";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateReasonRejectForm from "../components/CreateReasonRejectForm";
import Loading from "../../../components/Loading";
import UpdateReasonRejectForm from "../components/UpdateReasonRejectForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {reason_reject_path} from "../../../helpers/utilsFunc";

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
    document.title = "Quản lý lý do loại";
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
            <div className="tmp-title-page-size20">Quản lý lý do loại</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <ButtonCreate path={reason_reject_path} action="create" name=" Tạo lý do" handleClick={handleCreate}/>
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
