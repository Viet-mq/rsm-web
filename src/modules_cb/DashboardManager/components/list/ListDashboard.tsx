import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  getDepartmentReport,
  getRecruitmentActivitiesReport,
  getRecruitmentEfficiencyReport,
  getRecruitmentResultReport,
  getRejectReport
} from "../../redux/actions";
import {ColumnProps} from "antd/lib/table";
import {DepartmentReportEntity} from "../../types";


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
  // const columnsReject1: ColumnProps<RejectReportEntity>[] = [
  //   {
  //     title: 'STT',
  //     key: 'index',
  //     width: 40,
  //     align:"center",
  //     render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
  //   },
  //   {
  //     title: 'Tin tuyển dụng',
  //     dataIndex: 'recruitmentName',
  //     key: 'recruitmentName',
  //     width: 100,
  //     fixed: 'left',
  //     sorter: (a, b) => a.recruitmentName.length - b.recruitmentName.length,
  //     sortOrder: state.sortedInfo.columnKey === 'fullName' && state.sortedInfo.order,
  //   },
  //   {
  //     title: 'Tin tuyển dụng',
  //     dataIndex: 'recruitmentName',
  //     key: 'recruitmentName',
  //     width: 100,
  //     fixed: 'left',
  //     sorter: (a, b) => a.recruitmentName.length - b.recruitmentName.length,
  //     sortOrder: state.sortedInfo.columnKey === 'fullName' && state.sortedInfo.order,
  //   },
  //   {
  //     title: 'Other',
  //     children: [
  //       {
  //         title: 'Age',
  //         dataIndex: 'age',
  //         key: 'age',
  //         width: 150,
  //         sorter: (a, b) => a.age - b.age,
  //       },
  //       {
  //         title: 'Address',
  //         children: [
  //           {
  //             title: 'Street',
  //             dataIndex: 'street',
  //             key: 'street',
  //             width: 150,
  //           },
  //           {
  //             title: 'Block',
  //             children: [
  //               {
  //                 title: 'Building',
  //                 dataIndex: 'building',
  //                 key: 'building',
  //                 width: 100,
  //               },
  //               {
  //                 title: 'Door No.',
  //                 dataIndex: 'number',
  //                 key: 'number',
  //                 width: 100,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Company',
  //     children: [
  //       {
  //         title: 'Company Address',
  //         dataIndex: 'companyAddress',
  //         key: 'companyAddress',
  //         width: 200,
  //       },
  //       {
  //         title: 'Company Name',
  //         dataIndex: 'companyName',
  //         key: 'companyName',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Gender',
  //     dataIndex: 'gender',
  //     key: 'gender',
  //     width: 80,
  //     fixed: 'right',
  //   },
  // ];

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
      children: columnChildrens(),
    },
    {
      title: 'Tổng',
      align: "center",
      // dataIndex: 'recruitmentName',
      key: 'sum',
      width: 50,
    },
  ];

  function columnChildrens() {
    let column = [];
    column = department.rows[0]?.sources?.reduce((curr: any, next: any) => {
      const treeObject = {
        title: next.sourceCVName,
        key: next.sourceCVName,
        dataIndex: next.sourceCVName,
        width: 100,
        // children: getChildrenRecursive(next.actions)
      }
      curr.push(treeObject);
      return curr;
    }, [])
    return column;
  }


  useEffect(() => {
    props.getDepartmentReport();
    // props.getRecruitmentActivitiesReport();
    // props.getRecruitmentEfficiencyReport();
    // props.getRecruitmentResultReport();
    // props.getRejectReport();
    document.title = "Báo cáo thống kê";

  }, [])


  return (
    <>
      <div>Báo cáo tổng hợp nguồn ứng viên</div>
      <Table
        // scroll={{x: "1000px"}}
        scroll={scroll}
        className="custom-table"
        dataSource={department.rows}
        columns={columnsDepartment}
        rowKey="recruitmentName"
        bordered
        locale={{emptyText: emptyText}}
        pagination={{
          current: page.department,
          pageSize: size.pageDepartment,
          total: department.total,
          onChange: value => setPage({...page, pageDepartment: value}),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
      <br/>
      <br/>
      <br/>

      <div>Báo cáo kết quả tin tuyển dụng và hiệu quả nhân sự</div>
      {/*<Table*/}
      {/*  scroll={scroll}*/}
      {/*  className="custom-table"*/}
      {/*  dataSource={recruitmentEfficiency.rows}*/}
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
