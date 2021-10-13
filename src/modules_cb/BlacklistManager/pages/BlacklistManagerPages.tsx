import React, {useEffect} from "react";
import ListBlacklist from "../components/list/ListBlacklist";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateBlacklistForm from "../components/CreateBlacklistForm";
import Loading from "../../../components/Loading";
import UpdateBlacklistForm from "../components/UpdateBlacklistForm";

const mapStateToProps = ({
                           blacklistManager: {
                             showForm,
                             list,
                             create,
                             deleteBlacklist,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteBlacklist,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function BlacklistManagerPages(props: IProps) {

  useEffect(() => {
    document.title = "Quản lý Blacklist";
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
            <div className="tmp-title-page-size20">Quản lý Blacklist</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo Blacklist
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListBlacklist/>

      <CreateBlacklistForm/>
      <UpdateBlacklistForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteBlacklist.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(BlacklistManagerPages);
