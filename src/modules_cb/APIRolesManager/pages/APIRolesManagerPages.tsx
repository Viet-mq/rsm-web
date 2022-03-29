import React, {useEffect} from "react";
import ListAPIRoles from "../components/list/ListAPIRoles";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateAPIRolesForm from "../components/CreateAPIRolesForm";
import Loading from "../../../components/Loading";
import UpdateAPIRolesForm from "../components/UpdateAPIRolesForm";

const mapStateToProps = ({
                           apiRolesManager: {
                             showForm,
                             list,
                             create,
                             deleteAPIRoles,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteAPIRoles,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}
function APIRolesManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý API Roles";
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
            <div className="tmp-title-page-size20">Quản lý API Roles</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo API Roles
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListAPIRoles/>

      <CreateAPIRolesForm/>
      <UpdateAPIRolesForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteAPIRoles.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(APIRolesManagerPages);
