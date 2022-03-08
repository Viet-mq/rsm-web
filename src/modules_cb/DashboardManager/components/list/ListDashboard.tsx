import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {
  getDepartmentDownload,
  getDepartmentReport,
  getRecruitmentActivitiesReport,
  getRecruitmentEfficiencyReport,
  getRecruitmentResultReport,
  getRejectReport
} from "../../redux/actions";
import {ColumnProps} from "antd/lib/table";
import {
  DepartmentReportEntity,
  RecruitmentActivitiesReportEntity,
  RecruitmentEfficiencyReportEntity, RecruitmentResultReportEntity, RejectReportEntity
} from "../../types";
import {Button, Icon, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {exportExcelFile} from "../../../ProfileManager/redux/services/apis";
import {
  exportDepartmentExcelFile,
  exportRecruitmentActivitiesExcelFile,
  exportRecruitmentEfficiencyExcelFile, exportRecruitmentResultExcelFile, exportRejectExcelFile
} from "../../redux/services/apis";

const mapStateToProps = (state: RootState) => ({
  dashboardManager: state.dashboardManager,
})

const connector = connect(mapStateToProps,
  {
    getDepartmentReport,
    getRecruitmentActivitiesReport,
    getRecruitmentEfficiencyReport,
    getRecruitmentResultReport,
    getRejectReport,
    getDepartmentDownload,
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
        const a: any = Object.values(record.sources)?.reduce((a: any, b: any) => a + b)
        return <span style={{fontWeight: 500}}>{a}</span>;
      }
    },
  ];

  const columnsRecruitmentEfficiency: ColumnProps<RecruitmentEfficiencyReportEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page.pageRecruitmentActivities - 1) * 10 + index + 1
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
      title: 'Vòng tuyển dụng',
      children: columnChildren(recruitmentEfficiency.rows[0]?.status),
    },
    {
      title: 'Người tạo',
      key: 'createBy',
      width: 100,
      dataIndex:"createBy"
    },
  ];

  const columnsRecruitmentActivities: ColumnProps<RecruitmentActivitiesReportEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page.pageRecruitmentEfficiency - 1) * 10 + index + 1
      }
    },
    {
      title: "Thành viên",
      // align: "center",
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    },
    {
      title: "Username",
      // align: "center",
      dataIndex: 'createBy',
      key: 'createBy',
      width: 100,
    },

    {
      title: "Tin đã tạo",
      // align: "center",
      dataIndex: 'recruitmentTotal',
      key: 'recruitmentTotal',
      width: 100,
    },

    {
      title: "Số ghi chú",
      // align: "center",
      dataIndex: 'noteTotal',
      key: 'noteTotal',
      width: 100,
    },

    {
      title: 'Vòng tuyển dụng',
      children: columnChildren(recruitmentActivities.rows[0]?.status),
    },

  ];

  const columnsRecruitmentResult: ColumnProps<RecruitmentResultReportEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page.pageRecruitmentResult - 1) * 10 + index + 1
      }
    },
    {
      title: "Tin tuyển dụng",
      // align: "center",
      dataIndex: 'recruitmentName',
      key: 'recruitmentName',
      width: 150,
    },
    {
      title: "Cần tuyển",
      // align: "center",
      dataIndex: 'needToRecruit',
      key: 'needToRecruit',
      width: 100,
    },

    {
      title: "Đã tuyển",
      // align: "center",
      dataIndex: 'recruited',
      key: 'recruited',
      width: 100,
    },

    {
      title: "Tỷ lệ hoàn thành",
      // align: "center",
      dataIndex: 'percent',
      key: 'percent',
      width: 100,
    },

  ];

  const columnsReject: ColumnProps<RejectReportEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page.pageReject - 1) * 10 + index + 1
      }
    },
    {
      title: "Lý do",
      // align: "center",
      dataIndex: 'reason',
      key: 'reason',
      width: 100,
      render: (text, record, index) => {
        return record.reasons[0].reason;
      }
    },
    {
      title: "Số lượng",
      // align: "center",
      dataIndex: 'count',
      key: 'count',
      width: 100,
      render: (text, record, index) => {
        return record.reasons[0].count;
      }
    },

    {
      title: "Tỷ lệ",
      // align: "center",
      dataIndex: 'percent',
      key: 'percent',
      width: 100,
      render: (text, record, index) => {
        return record.reasons[0].percent;
      }
    },
  ];

  useEffect(() => {
    props.getDepartmentReport({page: page.pageDepartment, size: size.pageDepartment});
    props.getRecruitmentEfficiencyReport({page: page.pageRecruitmentEfficiency, size: 11});
    props.getRecruitmentActivitiesReport({page: page.pageRecruitmentActivities, size: 12});
    props.getRecruitmentResultReport({page: page.pageRecruitmentResult, size: 13});
    props.getRejectReport({page: page.pageReject, size: 14});
    document.title = "Báo cáo thống kê";
  }, [])

  console.log(recruitmentResult.rows)

  function columnChildren(data: any) {
    let column: any;
    if (data) {
      column = Object.keys(data)?.reduce((curr: any, next: any) => {
        const treeObject = {
          title: next,
          key: next,
          dataIndex: next,
          width: 100,
          render: (text: string, record: any) => {
            return record.sources?record.sources[next]:record.status[next];
          }
        }
        curr.push(treeObject);
        return curr;
      }, [])
      return column;
    }
  }

  function btnDepartmentDownload() {
    exportDepartmentExcelFile().then((value: any) => {
      const data = new Blob([value], {type: 'application/json'});
      const xlsxURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = xlsxURL;
      tempLink.setAttribute('download', 'Tong-hop-ung-vien-theo-vi-tri-tuyen-dung.xlsx');
      tempLink.click();
    });
  }

  function btnRecruitmentEfficiencyDownload() {
    exportRecruitmentEfficiencyExcelFile().then((value: any) => {
      const data = new Blob([value], {type: 'application/json'});
      const xlsxURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = xlsxURL;
      tempLink.setAttribute('download', 'Tong-hop-ket-qua-tin-tuyen-dung-va-hieu-qua-nhan-su.xlsx');
      tempLink.click();
    });
  }

  function btnRecruitmentActivitiesDownload() {
    exportRecruitmentActivitiesExcelFile().then((value: any) => {
      const data = new Blob([value], {type: 'application/json'});
      const xlsxURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = xlsxURL;
      tempLink.setAttribute('download', 'Tong-hop-hoat-dong-tuyen-dung.xlsx');
      tempLink.click();
    });
  }

  function btnRecruitmentResultDownload() {
    exportRecruitmentResultExcelFile().then((value: any) => {
      const data = new Blob([value], {type: 'application/json'});
      const xlsxURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = xlsxURL;
      tempLink.setAttribute('download', 'Tong-hop-ket-qua-tuyen-dung-theo-tin-tuyen-dung.xlsx');
      tempLink.click();
    });
  }

  function btnRejectDownload() {
    exportRejectExcelFile().then((value: any) => {
      const data = new Blob([value], {type: 'application/json'});
      const xlsxURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = xlsxURL;
      tempLink.setAttribute('download', 'Thong-ke-ung-vien-bi-loai-tai-vong-tuyen-dung.xlsx');
      tempLink.click();
    });
  }

  return (
    <>
      <div className='flex-space-between-item-center'>
        <div className="font-15-bold-500">Báo cáo tổng hợp nguồn ứng viên</div>
        <Button onClick={btnDepartmentDownload}><Icon type={"download"}/></Button>
      </div>

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

      <div className='flex-space-between-item-center'>
        <div className="font-15-bold-500">Báo cáo kết quả tin tuyển dụng và hiệu quả nhân sự</div>
        <Button onClick={btnRecruitmentEfficiencyDownload}><Icon type={"download"}/></Button>
      </div>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={recruitmentEfficiency.rows}
        columns={columnsRecruitmentEfficiency}
        rowKey="recruitmentName"
        bordered
        locale={{emptyText: emptyText}}
        pagination={{
          current: page.pageRecruitmentEfficiency,
          pageSize: size.pageRecruitmentEfficiency,
          total: recruitmentEfficiency.total,
          onChange: value => setPage({...page, pageRecruitmentEfficiency: value}),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
      <br/>
      <br/>

      <div className='flex-space-between-item-center'>
        <div className="font-15-bold-500">Báo cáo tổng hợp hoạt động tuyển dụng</div>
        <Button onClick={btnRecruitmentActivitiesDownload}><Icon type={"download"}/></Button>
      </div>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={recruitmentActivities.rows}
        columns={columnsRecruitmentActivities}
        rowKey="createBy"
        bordered
        locale={{emptyText: emptyText}}
        pagination={{
          current: page.pageRecruitmentActivities,
          pageSize: size.pageRecruitmentActivities,
          total: recruitmentActivities.total,
          onChange: value => setPage({...page, pageRecruitmentActivities: value}),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      >
      </Table>

      <br/>
      <br/>

      <div className='flex-space-between-item-center'>
        <div className="font-15-bold-500">Báo cáo kết quả tuyển dụng</div>
        <Button onClick={btnRecruitmentResultDownload}><Icon type={"download"}/></Button>
      </div>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={recruitmentResult.rows}
        columns={columnsRecruitmentResult}
        rowKey="recruitmentName"
        bordered
        locale={{emptyText: emptyText}}
        pagination={{
          current: page.pageRecruitmentResult,
          pageSize: size.pageRecruitmentResult,
          total: recruitmentResult.total,
          onChange: value => setPage({...page, pageRecruitmentResult: value}),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      >
      </Table>

      <br/>
      <br/>

      <div className='flex-space-between-item-center'>
        <div className="font-15-bold-500">Báo cáo ứng viên bị loại</div>
        <Button onClick={btnRejectDownload}><Icon type={"download"}/></Button>
      </div>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={reject.rows}
        columns={columnsReject}
        rowKey="reason"
        bordered
        locale={{emptyText: emptyText}}
        pagination={{
          current: page.pageReject,
          pageSize: size.pageReject,
          total: reject.total,
          onChange: value => setPage({...page, pageReject: value}),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      >
      </Table>


    </>
  );

}

export default connector(ListDashboard);
