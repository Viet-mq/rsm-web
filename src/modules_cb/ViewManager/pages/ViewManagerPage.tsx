import React, {useEffect} from "react";
import {Col, Row} from "antd";
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showViewCreateForm} from "../redux/actions";
import CreateViewForm from "../components/CreateViewForm";
import Loading from "../../../components/Loading";
import AddActionForm from "../components/AddActionForm";
import ListView from "../components/list/ListView";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {view_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({viewManager: {list, create, deleteView, add_action, remove_action}}: RootState) => ({
  list,
  create,
  deleteView,
  add_action,
  remove_action
})
const connector = connect(mapStateToProps, {
  showViewCreateForm
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ViewManagerPage(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý View";
  }, []);

  const handleCreate = () => {
    props.showViewCreateForm(true);
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý View (menu hiển thị)</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <ButtonCreate path={view_path} action="create" name=" Thêm View" handleClick={handleCreate}/>

              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListView/>

      <CreateViewForm/>

      <AddActionForm/>

      {props.list.loading || props.create.loading || props.deleteView.loading || props.add_action.loading || props.remove_action.loading ?
        <Loading/> : null}

    </div>
  )
}

export default connector(ViewManagerPage);
