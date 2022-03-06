import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {
  getDepartmentReport,
  getRecruitmentActivitiesReport,
  getRecruitmentEfficiencyReport,
  getRecruitmentResultReport,
  getRejectReport
} from "../../redux/actions";
import {ColumnProps} from "antd/lib/table";
import {DepartmentReportEntity, RecruitmentEfficiencyReportEntity} from "../../types";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";

const mapStateToProps = (state: RootState) => ({
  dashboardManager: state.dashboardManager,
})

const connector = connect(mapStateToProps,
  {
    getDepartmentReport,
    getRecruitmentActivitiesReport,
    getRecruitmentEfficiencyReport,
    getRecruitmentResultReport,
    getRejectReport
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListDashboard(props: IProps) {
  const {reject, recruitmentActivities, recruitmentEfficiency, recruitmentResult, department} = props.dashboardManager
  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState<any>({
    pageReject: 1,
    pageRecruitmentActivities: 1,
    pageRecruitmentEfficiency: 1,
    pageRecruitmentResult: 1,
    pageDepartment: 1,
  });
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = {
    pageReject: 10,
    pageRecruitmentActivities: 10,
    pageRecruitmentEfficiency: 10,
    pageRecruitmentResult: 10,
    pageDepartment: 10,
  };
  const [state, setState] = useState<any>({
    filteredInfo: null,
    sortedInfo: {
      order: null,
      columnKey: null,
    },
  });

  const columnsDepartment: ColumnProps<DepartmentReportEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page.pageDepartment - 1) * 10 + index + 1
      }
    },
    {
      title: 'Tin tuyển dụng',
      align: "center",
      dataIndex: 'recruitmentName',
      key: 'recruitmentName',
      width: 150,
    },

    {
      title: 'Nguồn ứng viên',
      children: columnChildren(department.rows[0]?.sources),
    },
    {
      title: 'Tổng',
      align: "center",
      key: 'sum',
      width: 50,
      render: (text, record) => {
        const a:any =Object.values(record.sources)?.reduce((a:any, b:any) => a + b)
        return <span style={{fontWeight: 500}}>{a}</span>;
      }
    },
  ];
  
  useEffect(() => {
    props.getDepartmentReport({page: page.pageDepartment, size: size.pageDepartment});
    props.getRecruitmentEfficiencyReport({page: page.pageRecruitmentEfficiency, size: size.pageRecruitmentEfficiency});
    // props.getRecruitmentActivitiesReport();
    // props.getRecruitmentResultReport();
    // props.getRejectReport();
    document.title = "Báo cáo thống kê";

  }, [])

  function columnChildren(data: any) {
    let column: any;
    if (data) {
      column = Object.keys(data)?.reduce((curr: any, next: any) => {
        const treeObject = {
          title: next,
          key: next,
          dataIndex: next,
          width: 100,
          render: (text: string, record: DepartmentReportEntity) => {
            return record.sources[next];
          }
        }
        curr.push(treeObject);
        return curr;
      }, [])
      return column;
    }
  }

  return (
    <>
      <div className="font-15-bold-500">Báo cáo tổng hợp nguồn ứng viên</div>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={department.rows}
        columns={columnsDepartment}
        rowKey="recruitmentName"
        bordered
        locale={{emptyText: emptyText}}
        pagination={{
          current: page.pageDepartment,
          pageSize: size.pageDepartment,
          total: department.total,
          onChange: value => setPage({...page, pageDepartment: value}),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
      <br/>
      <br/>

      <div className="font-15-bold-500">Báo cáo kết quả tin tuyển dụng và hiệu quả nhân sự</div>
      {/*<Table*/}
      {/*  scroll={scroll}*/}
      {/*  className="custom-table"*/}
      {/*  dataSource={recruitmentEfficiency.rows}*/}
      {/*  columns={columnsRecruitmentEfficiency}*/}
      {/*  rowKey="recruitmentName"*/}
      {/*  bordered*/}
      {/*  locale={{emptyText: emptyText}}*/}
      {/*  pagination={{*/}
      {/*    current: page.pageDepartment,*/}
      {/*    pageSize: size.pageDepartment,*/}
      {/*    total: department.total,*/}
      {/*    onChange: value => setPage({...page, pageDepartment: value}),*/}
      {/*    showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,*/}
      {/*  }}*/}
      {/*/>*/}


      <div>Báo cáo tổng hợp hoạt động tuyển dụng</div>
      {/*<Table*/}
      {/*  scroll={scroll}*/}
      {/*  className="custom-table"*/}
      {/*  dataSource={props.list.rows}*/}
      {/*  columns={columns}*/}
      {/*  rowKey="id"*/}
      {/*  locale={{emptyText: emptyText}}*/}
      {/*  pagination={{*/}
      {/*    current: page,*/}
      {/*    pageSize: size,*/}
      {/*    total: props.list.total,*/}
      {/*    onChange: value => setPage(value),*/}
      {/*    showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,*/}
      {/*  }}*/}
      {/*>*/}
      {/*</Table>*/}

      <div>Báo cáo kết quả tuyển dụng</div>
      {/*<Table*/}
      {/*  scroll={scroll}*/}
      {/*  className="custom-table"*/}
      {/*  dataSource={props.list.rows}*/}
      {/*  columns={columns}*/}
      {/*  rowKey="id"*/}
      {/*  locale={{emptyText: emptyText}}*/}
      {/*  pagination={{*/}
      {/*    current: page,*/}
      {/*    pageSize: size,*/}
      {/*    total: props.list.total,*/}
      {/*    onChange: value => setPage(value),*/}
      {/*    showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,*/}
      {/*  }}*/}
      {/*>*/}
      {/*</Table>*/}

      <div>Báo cáo ứng viên bị loại</div>
      {/*<Table*/}
      {/*  scroll={scroll}*/}
      {/*  className="custom-table"*/}
      {/*  dataSource={props.list.rows}*/}
      {/*  columns={columns}*/}
      {/*  rowKey="id"*/}
      {/*  locale={{emptyText: emptyText}}*/}
      {/*  pagination={{*/}
      {/*    current: page,*/}
      {/*    pageSize: size,*/}
      {/*    total: props.list.total,*/}
      {/*    onChange: value => setPage(value),*/}
      {/*    showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,*/}
      {/*  }}*/}
      {/*>*/}
      {/*</Table>*/}


    </>
  );

}

export default connector(ListDashboard);
