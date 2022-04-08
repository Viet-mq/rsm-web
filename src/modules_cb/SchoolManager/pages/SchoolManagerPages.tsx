import React, {useEffect} from "react";
import ListSchool from "../components/list/ListSchool";
import {Col, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateSchoolForm from "../components/CreateSchoolForm";
import Loading from "../../../components/Loading";
import UpdateSchoolForm from "../components/UpdateSchoolForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {school_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({
                           schoolManager: {
                             showForm,
                             list,
                             create,
                             deleteSchool,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteSchool,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function SchoolManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý trường học";
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
            <div className="tmp-title-page-size20">Quản lý trường học</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <ButtonCreate path={school_path} action="create" name=" Thêm trường" handleClick={handleCreate}/>

              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListSchool/>
      <CreateSchoolForm/>
      <UpdateSchoolForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteSchool.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(SchoolManagerPages);
