import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteCompany,
  getListCompany,
  getSearchCompany,
  showFormUpdate,

} from "../../redux/actions";
import {CompanyEntity, DeleteCompanyRequest} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {company_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({companyManager}: RootState) => ({companyManager});

const connector = connect(mapStateToProps, {
  getListCompany,
  deleteCompany,
  showFormUpdate,

  getSearchCompany
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListCompany(props: IProps) {
  const columns: ColumnProps<CompanyEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page - 1) * 10 + index + 1
      }
    },
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      width: 100,
    },

    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: CompanyEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={company_path} message="công ty" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={company_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {list, search} = props.companyManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [company, setCompany] = useState<any>()

  useEffect(() => {
    props.getListCompany({page: page, size: size})
  }, [])

  useEffect(() => {
    setCompany(list)
  }, [list])

  useEffect(() => {
    setCompany(search)
  }, [search])

  const handleDelete = (event: any, entity: CompanyEntity) => {
    event.stopPropagation();
    let req: DeleteCompanyRequest = {
      id: entity.id
    }
    props.deleteCompany(req);
  }

  const handleEdit = (event: any, entity: CompanyEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked(value: any) {
    const req: any = {
      page: page,
      size: size,
      name: value
    }
    props.getSearchCompany(req);
  }

  return (
    <>
      <div className="c-filter-profile">
        <div style={{width: 200, display: "inline-block"}}>
          <Search
            onSearch={btnSearchClicked}
            placeholder="Tìm kiếm..."/>
        </div>
      </div>

      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={company?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: company?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListCompany);
