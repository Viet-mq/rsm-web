import React, {useEffect} from "react";
import ListEmail from "../components/list/ListEmail";
import {Button, Icon} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import Loading from "../../../components/Loading";
import {Link} from "react-router-dom";

const mapStateToProps = ({
                           jobManager: {
                             showForm,
                             list,
                             create,
                             deleteJob,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteJob,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function EmailManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Mẫu email";
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
    <div className="page-container">

      <div className="flex-space-between">
        <div className="font-20-bold-500">Mẫu Email</div>
        <Link to={`/email-manager/create`}>
          <Button type={"primary"} style={{width:235}}>
            <Icon type="plus"/>THÊM MẪU EMAIL MỚI
          </Button>
        </Link>
      </div>

      <ListEmail/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteJob.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(EmailManagerPages);
