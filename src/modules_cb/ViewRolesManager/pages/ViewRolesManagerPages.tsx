import React, {useEffect} from "react";
import ListViewRoles from "../components/list/ListViewRoles";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateViewRolesForm from "../components/CreateViewRolesForm";
import Loading from "../../../components/Loading";
import UpdateViewRolesForm from "../components/UpdateViewRolesForm";

const mapStateToProps = ({
                           viewRolesManager: {
                             showForm,
                             list,
                             create,
                             deleteViewRoles,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteViewRoles,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}
function ViewRolesManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý View Roles";
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
            <div className="tmp-title-page-size20">Quản lý View Roles</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo View Roles
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListViewRoles/>

      <CreateViewRolesForm/>
      <UpdateViewRolesForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteViewRoles.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(ViewRolesManagerPages);
