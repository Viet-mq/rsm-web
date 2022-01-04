import React, {useEffect} from "react";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import Loading from "../../../components/Loading";
import {showAddAPIForm, showAssignUserForm, showCreateGroupAPIForm, showUpdateGroupAPIForm} from "../redux/actions";
import ListGroupAPI from "../components/list/ListGroupAPI";
import CreateGroupAPIForm from "../components/CreateGroupAPIForm";
import UpdateGroupAPIForm from "../components/UpdateGroupAPIForm";

const mapStateToProps = ({
                           groupAPIManager: {
                             list,
                             create,
                             update,
                             deleteGroupAPI,
                             add_api,
                             remove_api,
                             assign_user,
                             revoke_user
                           }
                         }: RootState) => ({
  list, create, update, deleteGroupAPI, add_api, remove_api, assign_user, revoke_user
})
const connector = connect(mapStateToProps, {
  showCreateGroupAPIForm,
  showUpdateGroupAPIForm,
  showAssignUserForm,
  showAddAPIForm
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function GroupAPIManagerPage(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý Group API";
  }, []);

  const handleCreate = (e:any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showCreateGroupAPIForm(true);
  }

  return (
    <div className="contentPage">
      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý Group API</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={event=>handleCreate(event)}>
                  <Icon type="plus"/> Tạo Group API
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListGroupAPI/>

      <CreateGroupAPIForm/>

      <UpdateGroupAPIForm/>

      {props.list.loading || props.create.loading  || props.deleteGroupAPI.loading || props.update.loading || props.add_api.loading || props.remove_api.loading || props.assign_user.loading|| props.revoke_user.loading ?
        <Loading/> : null}

    </div>
  )
}

export default connector(GroupAPIManagerPage);
