import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React from "react";

import {
  deleteJob,
  getListJob,
  showFormCreate,
  showFormUpdate,
  updateJob
} from "../../redux/actions";
import {JobEntity, DeleteJobRequest} from "../../types";

const mapStateToProps = ({jobManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListJob,
  deleteJob,
  showFormCreate,
  showFormUpdate,
  updateJob
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListTalentPool(props: IProps) {


  return (
    <>
      <div >
        hello

      </div>
    </>
  );

}

export default connector(ListTalentPool);
