import React, {useEffect} from "react";
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getListIntent, showFormCreateIntent} from "../redux/actions";
import Loading from "src/components/Loading";
import ListIntent from "../components/ListIntent";
import {Button, Col, Icon, Row} from "antd";
import ListingHeader from "../components/ListingHeader";
import CreateIntentForm from "../components/CreateIntentForm";
import {NotificationError} from "src/components/Notification/Notification";
import UpdateIntentForm from "../components/UpdateIntentForm";

const mapStateToProps = ({intentManager: {list, create, deleteIntent, update}}: RootState) => ({
  list,
  create,
  deleteIntent,
  update
});
const connector = connect(mapStateToProps, {getListIntent, showFormCreateIntent});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function IntentManagerPage(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý ý định";
    props.getListIntent({page: 1, size: 100});
  }, []);

  function handleCreate() {
    let cb = props.list?.cb;
    if (cb === undefined || cb === null) {
      NotificationError("Thông báo", "Vui lòng chọn 1 Chat Bot");
      return;
    }
    if (cb.chatbot_id === "") {
      NotificationError("Thông báo", "Vui lòng chọn 1 Chat Bot");
      return;
    }
    props.showFormCreateIntent(true);
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý Intent (ý định)</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Intent
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListingHeader/>
      <ListIntent/>

      <CreateIntentForm/>
      <UpdateIntentForm/>

      {props.list.loading || props.create.loading || props.update.loading || props.deleteIntent.loading ?
        <Loading/> : null}
    </div>
  )

}

export default connector(IntentManagerPage);
