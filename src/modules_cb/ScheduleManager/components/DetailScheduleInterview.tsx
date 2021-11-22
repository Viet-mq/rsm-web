import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, Form, Icon, Modal} from "antd";
import React, {useEffect, useState} from "react";
import moment from "moment";
import 'devextreme/dist/css/dx.light.css';
import {createBooking, getBooking, showFormBooking, updateBooking} from "../../ProfileManager/redux/actions";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import {ScheduleEntity} from "../types";
import {DataShowBooking} from "../../ProfileManager/types";
import BookingForm from "../../ProfileManager/components/BookingForm";

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
  listAddress: state.addressManager.list
})

const connector = connect(mapStateToProps,
  {
    getBooking,
    getListAccount,
    getListStatusCV,
    updateBooking,
    createBooking,
    showFormBooking,
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface ScheduleInterviewProps extends FormComponentProps, ReduxProps {
  handleClosePopupDetail: () => void;
  visible: boolean,
  dataDetail: ScheduleEntity[] | any,
  idDetail:string
}

function ScheduleInterview(props: ScheduleInterviewProps) {
  const [visible, setVisible] = useState(false);
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const dataDetail=props.dataDetail?.find((item:any)=>item.id===props.idDetail)
  console.log("dataDetail", dataDetail)
  useEffect(() => setVisible(props?.visible), [props?.visible])

  const getInitials = (name?: string) => {
    if (name) {
      let initials: any = name.split(' ');
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }
      return initials.toUpperCase();
    }

  }

  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  const handleBooking = (event: any) => {
    event.stopPropagation();
    let req: DataShowBooking = {
      id: dataDetail.idProfile,
      fullName: dataDetail.fullName
    }
    props.showFormBooking(true, req);
  }

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        visible={visible}
        // visible={true}
        centered={true}
        width="530px"
        className="custom"
        afterClose={() => {
        }}
        onCancel={() => {
          props.handleClosePopupDetail()
        }}
        footer={""}>
        <div className="schedule-detail">
          <div className="schedule-detail-head">
            <div className="schedule-detail-title">{dataDetail?.type}</div>
            <div className="schedule-detail-job">
              <div className="main-1__green-dot"></div>
              <div className="main-1__job-description">{dataDetail?.recruitmentName}</div>
            </div>
          </div>
          <div className="schedule-detail-content">
            <div>ỨNG VIÊN</div>
            <div style={{fontWeight: 500, padding: 0}}>{dataDetail?.fullName}</div>
            <div><a style={{display: "flex"}}>Xem hồ sơ <Icon type="arrow-right" style={{fontSize: '22px'}}/></a></div>
            <div>THỜI GIAN</div>
            <div
              style={{fontWeight: 500}}>{moment(dataDetail?.date).format(dateFormat)}, {moment(dataDetail?.date).format(timeFormat)} - {moment(dataDetail?.interviewTime).format(timeFormat)}
            </div>
            <div style={{paddingTop: 20}}>ĐỊA ĐIỂM</div>
            <div
              style={{fontWeight: 500}}>{dataDetail?.floor ? dataDetail?.floor + '-' : null} {dataDetail?.interviewAddressName}</div>
            <div style={{paddingTop: 20}}>HỘI ĐỒNG</div>
            <div>
              {
                dataDetail?.interviewers.map((item: any, index: any) => {
                  return <Avatar key={index} style={{backgroundColor: dataDetail?.avatarColor, marginRight: 5}}>
                    {getInitials(item.full_name)}
                  </Avatar>
                })
              }
            </div>
          </div>
        </div>
        <div className="footer-left">
          <Button onClick={props.handleClosePopupDetail} style={{color: "red", marginRight: 10}}><Icon type="delete"
                                                                                                       className="mr-1"/>Xóa</Button>
          <Button onClick={event => handleBooking(event)}><Icon type="edit" className="mr-1"/>Chỉnh sửa</Button>

        </div>

      </Modal>
      <BookingForm/>
    </>
  );

}

export default connector(Form.create<ScheduleInterviewProps>()(ScheduleInterview));
