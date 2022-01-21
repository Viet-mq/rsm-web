import React, {useEffect} from "react";
import ListEmail from "../components/list/ListEmail";
import {Button, Icon} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import Loading from "../../../components/Loading";
import {Link} from "react-router-dom";
import {createBooking, showEmailCreateForm} from "../../ProfileManager/redux/actions";

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
  let {list,create,update,deleteJob} = props.emailManager

  useEffect(() => {
    document.title = "Mẫu email";
  }, []);


  return (
    <div className="page-container" style={{background: "white"}}>
      <div className="flex-space-between">
        <div className="font-20-bold-500">Mẫu Email</div>
        <Link to={`/email-manager/create`}>
          <Button type={"primary"} style={{width: 235}}>
            <Icon type="plus"/>THÊM MẪU EMAIL MỚI
          </Button>
        </Link>
      </div>

      <ListEmail/>

      {create.loading ||
      list.loading ||
      deleteJob.loading ||
      update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(EmailManagerPages);
