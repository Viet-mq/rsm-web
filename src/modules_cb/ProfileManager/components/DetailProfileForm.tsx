import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormDetail} from "../redux/actions";
import {Button, Select} from "antd";
import React, {useState} from "react";
import {DetailCV} from "../types";
import moment from "moment";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
})

const connector = connect(mapStateToProps,
  {
    showFormDetail,
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface DetailProfileFormProps extends ReduxProps {
}

function DetailProfileForm(props: DetailProfileFormProps) {
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const handeClose = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    let req: DetailCV = {
      show_detail: false,
      general: 24,
      detail: 0
    }
    props.showFormDetail(req);
  }

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }
  return (
    <div>

      <div>{props.showForm.data_update?.fullName}</div>
      <div>{props.showForm.data_update?.dateOfApply}</div>
      <div>{props.showForm.data_update?.hometown}</div>
      <div>{props.showForm.data_update?.school}</div>
      <div>{props.showForm.data_update?.phonenumber}</div>
      <div>{props.showForm.data_update?.email}</div>
      <div>{props.showForm.data_update?.job}</div>
      <div>{props.showForm.data_update?.levelJob}</div>
      <div>{props.showForm.data_update?.cv}</div>
      <div>{props.showForm.data_update?.sourceCV}</div>
      <div>{props.showForm.data_update?.hrRef}</div>
      <div>{props.showForm.data_update?.dateOfApply}</div>
      <div>{props.showForm.data_update?.cvType}</div>

      <div>
        <Button onClick={handeClose}>Close</Button>
      </div>
    </div>
  )
}

export default connector(DetailProfileForm);

