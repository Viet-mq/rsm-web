import React, {useEffect} from "react";
import ListRoles from "../components/list/ListRoles";
import {Col, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateRolesForm from "../components/CreateRolesForm";
import Loading from "../../../components/Loading";
import UpdateRolesForm from "../components/UpdateRolesForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {roles_path} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  rolesManager: state.rolesManager,

})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function RolesManagerPages(props: IProps) {
  const {showForm, list, create, deleteRoles, update,} = props.rolesManager
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
            <div className="tmp-title-page-size20">Quản lý Roles</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <ButtonCreate path={roles_path} action="create" name=" Thêm Roles" handleClick={handleCreate}/>

              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListRoles/>

      {showForm.show_create&&<CreateRolesForm/>}
      {showForm.show_update&&<UpdateRolesForm/>}

      {create.loading ||
      list.loading ||
      deleteRoles.loading ||
      update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(RolesManagerPages);
