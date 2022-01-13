import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Switch, Tabs} from "antd";
import {deleteJob, getListJob, showFormCreate, showFormUpdate, updateJob} from "../../redux/actions";
import {DeleteJobRequest, JobEntity} from "../../types";
import Search from "antd/es/input/Search";
import {RiMailSendLine} from "react-icons/all";
import {Link} from "react-router-dom";

const {TabPane} = Tabs;

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

function ListEmail(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;
  const operations = <Search
    placeholder="Tìm kiếm nhanh mẫu email"
    // onSearch={value => onSearch(value)}
    style={{width: 235}}
  />;

  useEffect(() => {
    props.getListJob({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: JobEntity) => {
    event.stopPropagation();
    let req: DeleteJobRequest = {
      id: entity.id
    }
    props.deleteJob(req);
  }

  const handleEdit = (event: any, entity: JobEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  const columns: ColumnProps<JobEntity>[] = [
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
      title: 'Name',
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
      render: (_text: string, record: JobEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Job này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDelete(event, record)}
            >
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <Icon type="delete" theme="filled"/>
              </Button>
            </Popconfirm>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleEdit(event, record)}
            >
              <Icon type="edit"/>
            </Button>
          </div>
        );
      },
    },
  ];


  return (
    <div className="list-email-container mt-2">
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="XÁC NHẬN ỨNG TUYỂN" key="1">

          <div className="border-bottom flex-space-between-item-center" style={{padding: " 15px 0"}}>
            <div className="flex-items-flex-start">
              <div style={{marginRight: 10, color: "#969C9D"}}>
                <RiMailSendLine size={40}/>
              </div>
              <div>
                <div>
                  <Link to={"/email-manager/detail"} className="font-15-bold-500" style={{marginRight: "1px"}}>
                    <span>item.fullName</span>
                  </Link>
                </div>

                <div style={{color: "#B2B2B2"}}>item.email</div>
                <div style={{color: "#B2B2B2"}}>Tạo bởi @Duyho lúc 11:23 05/04/1999</div>
              </div>
            </div>

            <div>
              <Switch defaultChecked className="mr-2"/>
            </div>
          </div>

        </TabPane>
        <TabPane tab="INTERVIEW" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="OFFER" key="3">
          Content of tab 3
        </TabPane>
        <TabPane tab="REJECT" key="4">
          Content of tab 3
        </TabPane>
      </Tabs>
    </div>
  );

}

export default connector(ListEmail);
