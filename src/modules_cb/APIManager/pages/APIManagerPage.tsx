import React, {useEffect} from "react";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreateApi} from "../redux/actions";
import CreateApiForm from "../components/CreateAPIForm";
import UpdateApiForm from "../components/UpdateAPIForm";
import Loading from "../../../components/Loading";
import ListApiRole from "../components/list/ListApiRole";

const mapStateToProps = ({
                           apiManager: {
                             showForm,
                             list,
                             create,
                             deleteApi,
                             update
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteApi,
  update
})
const connector = connect(mapStateToProps, {showFormCreateApi});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function APIManagerPage(props: IProps) {

  useEffect(() => {
    document.title = "API Manager";
  }, []);

  const handleCreate = () => {
    props.showFormCreateApi(true);
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý API</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Thêm API
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListApiRole/>

      <CreateApiForm/>

      <UpdateApiForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteApi.loading ||
      props.update.loading  ?
        <Loading/> : null}

    </div>
  );

}

export default connector(APIManagerPage);
