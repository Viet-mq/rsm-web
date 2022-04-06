import React, {useEffect} from "react";
import ListCompany from "../components/list/ListCompany";
import {Col, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateCompanyForm from "../components/CreateCompanyForm";
import Loading from "../../../components/Loading";
import UpdateCompanyForm from "../components/UpdateCompanyForm";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {company_path} from "../../../helpers/utilsFunc";

const mapStateToProps = ({
                           companyManager: {
                             showForm,
                             list,
                             create,
                             deleteCompany,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteCompany,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function CompanyManagerPages(props: IProps) {

  const view_id = "company-manager";

  useEffect(() => {
    document.title = "Quản lý Công ty";
  }, []);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  const CheckViewAction = (viewId: string, action: string) => {

    // find view by id: view_id
    // check "action" exist

    return true;
  }

  return (
    <div className="contentPage">

      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20">Quản lý Công ty</div>
          </Col>
          <Col className="d-flex" md={8}>
            {CheckViewAction(view_id, "create")
              ?
              <div className="tmp-btn">
                <div>
                  <ButtonCreate path={company_path} action="create" name=" Thêm công ty" handleClick={handleCreate}/>

                </div>
              </div>
              : null}
          </Col>
        </Row>
      </div>

      <ListCompany/>

      <CreateCompanyForm/>
      <UpdateCompanyForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteCompany.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(CompanyManagerPages);
