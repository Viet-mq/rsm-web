import {RootState} from "../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, Form, Icon, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createJob, showFormCreate} from "../JobManager/redux/actions";
import {CreateJobRequest} from "../JobManager/types";
import moment from "moment";
import 'devextreme/dist/css/dx.light.css';
import {ProfileEntity} from "../ProfileManager/types";

const mapStateToProps = ({jobManager}: RootState) => ({jobManager});
const connector = connect(mapStateToProps, {createJob, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

const {Option} = Select;

interface ScheduleInterviewProps extends FormComponentProps, ReduxProps {
  handleClosePopupDetail: () => void;
  visible: boolean
}

function ScheduleInterview(props: ScheduleInterviewProps) {
  const [visible, setVisible] = useState(false);
  const dateFormat = 'DD/MM/YYYY';
  useEffect(() => setVisible(props?.visible), [props?.visible])
  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateJobRequest = {
          name: values.name,
        }
        props.createJob(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  const getInitials = (name: string) => {
    let initials: any = name.split(' ');

    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }

    return initials.toUpperCase();
  }

  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  const columns: any[] = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      width: 170,
      key: 'fullName',
      render: (text: string, record: ProfileEntity) => {

        return <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: 10}}>
            {/*<Badge count={1}>*/}

            <Avatar src={record.image ? record.image : "#"} style={{backgroundColor: setColor()}}>
              {record.image ? null : getInitials(record.fullName)}
            </Avatar>
            {/*</Badge>*/}
          </div>

          <div>
            <div>
              <div className="c-list-profile" style={{marginRight: "1px", fontWeight: 500}}>
                <span>{text}</span>
              </div>
            </div>

            <span style={{color: "#B2B2B2",}}>
                        {record.levelJobName}
                      </span>
          </div>

        </div>
      },

    },
    {
      title: 'Thời gian',
      dataIndex: 'dateOfApply',
      width: 80,
      key: 'dateOfApply',
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}></div>;
      },
      dataIndex: 'action',
      width: 30,
      align: "center",
      // fixed: 'right',
      render: (_text: string, record: ProfileEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              onClick={event => {
                event.stopPropagation();
              }}
            >
              <Icon type="delete" theme="filled"/>
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: '1',
      fullName: 'Hồ Đức Duy',
      dateOfApply: 1636998012,
    },
    {
      key: '2',
      fullName: 'Phạm Kỳ Quân',
      dateOfApply: 1636998012,
    },
    {
      key: '3',
      fullName: 'Phạm Trung Hiếu',
      dateOfApply: 1636998012,
    },
    {
      key: '4',
      fullName: 'Phạm Trung Hiếu',
      dateOfApply: 1636998012,
    },
    {
      key: '5',
      fullName: 'Phạm Trung Hiếu',
      dateOfApply: 1636998012,
    },
    {
      key: '6',
      fullName: 'Phạm Trung Hiếu',
      dateOfApply: 1636998012,
    },
    {
      key: '7',
      fullName: 'Phạm Trung Hiếu',
      dateOfApply: 1636998012,
    },
    {
      key: '8',
      fullName: 'Phạm Trung Hiếu',
      dateOfApply: 1636998012,
    },
    {
      key: '9',
      fullName: 'Phạm Trung Hiếu',
      dateOfApply: 1636998012,
    },
  ];

  function handleAddProfile() {
    console.log("hello")
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      // title="Phỏng vấn trực tiếp"
      visible={visible}
      // visible={true}
      centered={true}
      width="530px"
      className="custom"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.handleClosePopupDetail()
      }}
      footer={""}>
      <div className="schedule-detail">
        <div className="schedule-detail-head">
          <div className="schedule-detail-title">Phỏng vấn trực tiếp</div>
          <div className="schedule-detail-job">
            <div className="main-1__green-dot"></div>
            <div className="main-1__job-description">Business Analysis</div>
          </div>
        </div>
        <div className="schedule-detail-content">
          <div>ỨNG VIÊN</div>
          <div style={{fontWeight: 500,padding:0}}>Hồ Đức Duy</div>
          <div><a style={{display:"flex"}}>Xem hồ sơ <Icon type="arrow-right" style={{fontSize: '22px'}}/></a></div>
          <div>THỜI GIAN</div>
          <div style={{fontWeight: 500}}>16/11/2021, 10:30 - 10:40</div>
          <div style={{paddingTop:20}}>ĐỊA ĐIỂM</div>
          <div style={{fontWeight: 500}}>16 ngõ 2</div>
          <div style={{paddingTop:20}}>HỘI ĐỒNG</div>
          <div><Avatar>HD</Avatar></div>

        </div>
      </div>
      <div className="footer-left">
        <Button onClick={props.handleClosePopupDetail} style={{color: "red", marginRight: 10}}><Icon type="delete"
                                                                                                     className="mr-1"/>Xóa</Button>
        <Button><Icon type="edit" className="mr-1"/>Chỉnh sửa</Button>

      </div>

    </Modal>

  );

}

export default connector(Form.create<ScheduleInterviewProps>()(ScheduleInterview));
