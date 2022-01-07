import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect} from "react";
import {
  deleteTalentPool,
  getListTalentPool,
  showFormCreate,
  showFormUpdate,
  updateTalentPool
} from "../../redux/actions";
import TalentPoolItem from "../TalentPoolItem";

const mapStateToProps = ({talentPoolManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListTalentPool,
  deleteTalentPool,
  showFormCreate,
  showFormUpdate,
  updateTalentPool
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListTalentPool(props: IProps) {
  useEffect(() => {
    props.getListTalentPool({page: 1, size: 100});
  }, [])

  return (
    <>
      <div className="card-container">
        {props.list.rows.map((item: any, index: any) => {
          return <TalentPoolItem key={index} talentPool={item}/>

        })}
      </div>
    </>
  );

}

export default connector(ListTalentPool);
