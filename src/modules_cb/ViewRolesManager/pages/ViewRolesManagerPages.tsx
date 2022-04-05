import React, {useEffect} from "react";
import ListViewRoles from "../components/list/ListViewRoles";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateViewRolesForm from "../components/CreateViewRolesForm";
import Loading from "../../../components/Loading";
import UpdateViewRolesForm from "../components/UpdateViewRolesForm";
import {CheckViewAction, view_role_path} from "../../../helpers/utilsFunc";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import ButtonDelete from "../../../components/ComponentUtils/ButtonDelete";

const mapStateToProps = (state: RootState) => ({
  viewRolesManager: state.viewRolesManager,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ViewRolesManagerPages(props: IProps) {
  const { list, create, deleteViewRoles, update,} = props.viewRolesManager
  // const view_role_path = "/view-roles-manager";

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
            {CheckViewAction(view_role_path, "create")
              ?
              <div className="tmp-btn">
                <div>
                  <ButtonCreate path={view_role_path} action="create" name=" Tạo View Roles"  handleClick={handleCreate}/>
                </div>
              </div>
              : null}
          </Col>
        </Row>
      </div>

      <ListViewRoles/>

      <CreateViewRolesForm/>
      <UpdateViewRolesForm/>

      {create.loading ||
     list.loading ||
     deleteViewRoles.loading ||
     update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(ViewRolesManagerPages);
