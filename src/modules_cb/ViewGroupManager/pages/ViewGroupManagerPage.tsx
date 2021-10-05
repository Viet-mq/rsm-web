import React, {useEffect} from "react";
import {Button, Col, Icon, Row} from "antd";
import ListViewFrontEnd from "../components/list/ListMenuFrontend";
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import Loading from "../../../components/Loading";
import {showFormMenuFrontEndCreate, showFormMenuFrontEndUpdate} from "../redux/actions";
import CreateMenuFrontendForm from "../components/CreateMenuFrontendForm";
import UpdateMenuFrontendForm from "../components/UpdateMenuFrontendForm";


const mapStateToProps = ({viewGroupManager: {list, create,update}}: RootState) => ({
  list,
  create,
  update
})
const connector = connect(mapStateToProps, {
  showFormMenuFrontEndCreate,
  showFormMenuFrontEndUpdate
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ViewGroupManagerPage(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý Menu View";
  }, []);

  const handleCreate = (e:any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormMenuFrontEndCreate(true);
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý menu view</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Menu View
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListViewFrontEnd/>
      <CreateMenuFrontendForm/>
  <UpdateMenuFrontendForm/>
      {props.list.loading ||
      props.create.loading ||
      props.update.loading
        ?
        <Loading/> : null}

    </div>
  )
}

export default connector(ViewGroupManagerPage);
