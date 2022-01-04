import React, {useEffect} from "react";
import ListSourceCV from "../components/list/ListSourceCV";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateSourceCVForm from "../components/CreateSourceCVForm";
import Loading from "../../../components/Loading";
import UpdateSourceCVForm from "../components/UpdateSourceCVForm";

const mapStateToProps = ({
                           sourcecvManager: {
                             showForm,
                             list,
                             create,
                             deleteSourceCV,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteSourceCV,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function SourceCVManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý Nguồn ứng viên";
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
            <div className="tmp-title-page-size20">Quản lý Nguồn ứng viên</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Nguồn ứng viên
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListSourceCV/>

      <CreateSourceCVForm/>
      <UpdateSourceCVForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteSourceCV.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(SourceCVManagerPages);
