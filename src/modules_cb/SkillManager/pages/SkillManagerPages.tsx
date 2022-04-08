import React, {useEffect} from "react";
import ListSkill from "../components/list/ListSkill";
import {Col, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateSkillForm from "../components/CreateSkillForm";
import Loading from "../../../components/Loading";
import UpdateSkillForm from "../components/UpdateSkillForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {skill_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({
                           skillManager: {
                             showForm,
                             list,
                             create,
                             deleteSkill,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteSkill,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function SkillManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý kỹ năng công việc";
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
            <div className="tmp-title-page-size20">Quản lý kỹ năng công việc</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <ButtonCreate path={skill_path} action="create" name=" Thêm kỹ năng" handleClick={handleCreate}/>

              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListSkill/>

      <CreateSkillForm/>
      <UpdateSkillForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteSkill.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(SkillManagerPages);
