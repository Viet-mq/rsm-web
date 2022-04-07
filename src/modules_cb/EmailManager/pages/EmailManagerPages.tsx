import React, {useEffect} from "react";
import ListEmail from "../components/list/ListEmail";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import Loading from "../../../components/Loading";
import {Link} from "react-router-dom";
import {createBooking, showEmailCreateForm} from "../../ProfileManager/redux/actions";
import ButtonCreate from "../../../components/ComponentUtils/ButtonCreate";
import {email_path} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  emailManager: state.emailManager,

})

const connector = connect(mapStateToProps,
  {
    createBooking,
    showEmailCreateForm,
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function EmailManagerPages(props: IProps) {
  let {list, create, update, deleteEmail} = props.emailManager

  useEffect(() => {
    document.title = "Mẫu email";
  }, []);


  return (
    <div className="page-container" style={{background: "white"}}>
      <div className="flex-space-between">
        <div className="font-20-bold-500">Mẫu Email</div>
        <Link to={`/email-manager/create`}>
          <ButtonCreate path={email_path} action="create" name=" THÊM MẪU EMAIL MỚI"/>
        </Link>
      </div>

      <ListEmail/>

      {create.loading ||
      list.loading ||
      deleteEmail.loading ||
      update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(EmailManagerPages);
