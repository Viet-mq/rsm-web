import React, {useEffect} from "react";
import ListRoles from "../components/list/ListRoles";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateRolesForm from "../components/CreateRolesForm";
import Loading from "../../../components/Loading";
import UpdateRolesForm from "../components/UpdateRolesForm";

const mapStateToProps = ({
                           rolesManager: {
                             showForm,
                             list,
                             create,
                             deleteRoles,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteRoles,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}
function RolesManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý Roles";
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
            <div className="tmp-title-page-size20">Quản lý  Roles</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo  Roles
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListRoles/>

      <CreateRolesForm/>
      <UpdateRolesForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteRoles.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(RolesManagerPages);
