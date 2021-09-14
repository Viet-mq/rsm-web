import React from "react";
import ListEntity from "../components/ListEntity";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreateChatBotEntity} from "../redux/actions";
import CreateEntityForm from "../components/CreateEntityForm";
import HeaderBarEntity from "../components/HeaderBar";
import Loading from "../../../components/Loading";
import {NotificationError} from "../../../components/Notification/Notification";
import UpdateEntityForm from "../components/UpdateEntityForm";

const mapStateToProps = ({entityManager: {form, list, deleteState, create, update}}: RootState) => ({
  form,
  list,
  deleteState,
  create,
  update
});
const connector = connect(mapStateToProps, {showFormCreateChatBotEntity});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function EntityManagerPage(props: IProps) {

  function handleCreate() {
    let cb = props.list?.chatBot;
    if (cb === undefined || cb === null) {
      NotificationError("Thông báo", "Vui lòng chọn 1 Chat Bot");
      return;
    }
    if (cb.chatbot_id === "") {
      NotificationError("Thông báo", "Vui lòng chọn 1 Chat Bot");
      return;
    }
    props.showFormCreateChatBotEntity();
  }

  return (
    <div className="contentPage">

      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý thực thể</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Thực thể
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <HeaderBarEntity/>

      <ListEntity/>

      <CreateEntityForm/>
      <UpdateEntityForm/>

      {props.list.loading || props.create.loading || props.update.loading || props.deleteState.loading ?
        <Loading/> : null}

    </div>

  )

}

export default connector(EntityManagerPage);
