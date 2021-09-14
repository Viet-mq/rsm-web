import React, {useEffect} from "react";
import {Button, Col, Icon, Row} from "antd";
import ListViewFrontEnd from "../components/list/ListViewFrontEnd";
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFrontEndViewCreateForm} from "../redux/actions";
import CreateViewForm from "../components/CreateViewForm";
import Loading from "../../../components/Loading";
import UpdateViewForm from "../components/UpdateViewForm";
import AddActionForm from "../components/AddActionForm";

const mapStateToProps = ({viewManager: {list, create, update, deleteView, add_action, remove_action}}: RootState) => ({
  list,
  create,
  update,
  deleteView,
  add_action,
  remove_action
})
const connector = connect(mapStateToProps, {
  showFrontEndViewCreateForm
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ViewManagerPage(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý view front-end";
  }, []);

  const handleCreate = () => {
    props.showFrontEndViewCreateForm(true);
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý view (menu hiển thị)</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo View
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListViewFrontEnd/>

      <CreateViewForm/>

      <UpdateViewForm/>

      <AddActionForm/>

      {props.list.loading || props.create.loading || props.update.loading || props.deleteView.loading || props.add_action.loading || props.remove_action.loading ?
        <Loading/> : null}

    </div>
  )
}

export default connector(ViewManagerPage);
