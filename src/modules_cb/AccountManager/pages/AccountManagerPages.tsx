import React, {useEffect} from "react";
import ListAccount from "../components/ListAccount";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate} from "../redux/actions";
import CreateAccountForm from "../components/CreateAccountForm";
import Loading from "../../../components/Loading";
import UpdateAccountForm from "../components/UpdateAccountForm";
import ChangePasswordAccountForm from "../components/ChangePasswordAccountForm";

const mapStateToProps = ({
                           accountManager: {
                             showForm,
                             list,
                             create,
                             deleteAccount,
                             update,
                             changePassword
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteAccount,
  update,
  changePassword
})
const connector = connect(mapStateToProps, {showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function AccountManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý tài khoản";
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
            <div className="tmp-title-page-size20">Quản lý tài khoản hệ thống</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo tài khoản
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListAccount/>

      <CreateAccountForm/>
      <UpdateAccountForm/>
      <ChangePasswordAccountForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteAccount.loading ||
      props.update.loading ||
      props.changePassword.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(AccountManagerPages);
