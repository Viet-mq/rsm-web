import React, {useEffect} from "react";
import ListDepartment from "../components/list/ListDepartment";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateDepartmentForm from "../components/CreateDepartmentForm";
import Loading from "../../../components/Loading";
import UpdateDepartmentForm from "../components/UpdateDepartmentForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {department_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({
                           departmentManager: {
                             showForm,
                             list,
                             create,
                             deleteDepartment,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteDepartment,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function DepartmentManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý phòng ban";
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
            <div className="tmp-title-page-size20">Quản lý phòng ban</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo phòng ban
                </Button>

                <ButtonCreate path={department_path} action="create" name=" Thêm phòng ban" handleClick={handleCreate}/>

              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListDepartment/>

      <CreateDepartmentForm/>
      <UpdateDepartmentForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteDepartment.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(DepartmentManagerPages);
