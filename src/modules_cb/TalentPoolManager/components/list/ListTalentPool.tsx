import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteTalentPool, getListTalentPool, showFormUpdate} from "../../redux/actions";
import TalentPoolItem from "../TalentPoolItem";
import Search from "antd/es/input/Search";
import {Pagination} from "antd";
import {getListTalentPool as getListTalentPoolApi} from "../../redux/services/apis";

const mapStateToProps = ({talentPoolManager}: RootState) => ({talentPoolManager})
const connector = connect(mapStateToProps, {
  deleteTalentPool,
  showFormUpdate,
  getListTalentPool
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListTalentPool(props: IProps) {
  const {list} = props.talentPoolManager
  const [page, setPage] = useState(1);
  const size = 10;
  const [talentPool, setTalentPool] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    getListTalentPoolApi(req).then((rs: any) => {
      setTalentPool(rs)
    })
  }

  return (
    <>
      <div className="c-filter-profile">
        <div style={{width: 200, display: "inline-block"}}>
          <Search
            onChange={e => setNameSearch(e.target.value)}
            onSearch={btnSearchClicked}
            placeholder="Tìm kiếm..."/>
        </div>
      </div>

      <div className="card-container">
        {talentPool?.rows?.map((item: any, index: any) => {
          return <TalentPoolItem key={index} talentPool={item}/>

        })}
      </div>
      <Pagination
        current={page}
        total={talentPool?.total}
        pageSize={size}
        onChange={value => setPage(value)}
        className="pagination"
      />
    </>
  );

}

export default connector(ListTalentPool);
