import React, {useEffect} from "react";
import ListAddress from "../components/list/ListAddress";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateAddressForm from "../components/CreateAddressForm";
import Loading from "../../../components/Loading";
import UpdateAddressForm from "../components/UpdateAddressForm";

const mapStateToProps = ({
                           addressManager: {
                             showForm,
                             list,
                             create,
                             deleteAddress,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteAddress,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}
function AddressManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý địa chỉ";
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
            <div className="tmp-title-page-size20">Quản lý địa chỉ</div>
          </Col>
          <Col className="d-flex" md={8}>
            <div className="tmp-btn">
              <div>
                <Button onClick={handleCreate}>
                  <Icon type="plus"/> Tạo địa chỉ
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ListAddress/>

      <CreateAddressForm/>
      <UpdateAddressForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteAddress.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(AddressManagerPages);
