import React, {useEffect} from "react";
import ListSkill from "../components/list/ListSkill";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateSkillForm from "../components/CreateSkillForm";
import Loading from "../../../components/Loading";
import UpdateSkillForm from "../components/UpdateSkillForm";

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
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo kỹ năng
                </Button>
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
