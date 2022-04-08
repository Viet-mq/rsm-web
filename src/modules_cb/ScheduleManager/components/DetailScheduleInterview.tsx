import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Modal} from "antd";
import React, {useEffect, useState} from "react";
import moment from "moment";
import 'devextreme/dist/css/dx.light.css';
import {
  createBooking,
  getBooking,
  showFormBooking,
  showFormDetail,
  updateBooking
} from "../../ProfileManager/redux/actions";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import {ScheduleEntity} from "../types";
import {DataShowBooking, DetailCV} from "../../ProfileManager/types";
import BookingForm from "../../ProfileManager/components/BookingForm";
import {deleteSchedule} from "../redux/actions";
import {CheckViewAction, schedule_path} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  delete: state.scheduleManager.deleteSchedule
})
const connector = connect(mapStateToProps,
  {
    showFormBooking,
    deleteSchedule,
    showFormDetail
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
  handleClosePopupDetail: () => void;
  visible: boolean,
  dataDetail: ScheduleEntity[] | any,
  idDetail: string
}

function DetailScheduleInterview(props: IProps) {
  const [visible, setVisible] = useState(false);
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const dataDetail = props.dataDetail?.find((item: any) => item.id === props.idDetail)

  const handleBooking = (event: any) => {
    event.stopPropagation();
    let req: DataShowBooking = {
      id: dataDetail.idProfile,
      fullName: dataDetail.fullName,
      idRecruitment: dataDetail.recruitmentId,
      username: dataDetail.username
    }

    props.showFormBooking(true, req);
    props.handleClosePopupDetail()
  }
  const fontWeight = {
    fontWeight: 500
  }
  useEffect(() => setVisible(props?.visible), [props?.visible]);

  function btnDeleteScheduleClicked() {
    props.deleteSchedule({id: dataDetail?.id})
    props.handleClosePopupDetail();
  }

  console.log(dataDetail)

  function handleShowDetail(value:any){
    let req: DetailCV = {
      show_detail: false,
      general: 12,
      detail: 12
    }
    props.showFormDetail(req,value);
    props.handleClosePopupDetail()
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

            <div style={{...fontWeight}}>Ứng viên</div>
            <div style={{...fontWeight, padding: 0}}>{dataDetail?.fullName}</div>
            <div onClick={()=>handleShowDetail(dataDetail?.idProfile)}><a style={{display: "flex"}}>Xem hồ sơ <Icon type="arrow-right"
                                                              style={{fontSize: '22px', marginTop: 3}}/></a></div>

            <div style={{...fontWeight}}>Thời gian</div>
            <div>{moment(dataDetail?.date).format(dateFormat)}, {moment(dataDetail?.date).format(timeFormat)} - {moment(dataDetail?.interviewTime).format(timeFormat)}
            </div>

            <div style={{...fontWeight, paddingTop: 20}}>Địa điểm</div>
            <div>{dataDetail?.interviewAddressName}</div>

            <div style={{...fontWeight, paddingTop: 20}}>Phòng</div>
            <div>{dataDetail?.floor}</div>

            <div style={{...fontWeight, paddingTop: 20}}>Hội đồng</div>
            <div>
              <ul>
                {dataDetail?.interviewers?.map((item: any, index: any) => {
                  return <li key={index}>{item.full_name}</li>
                  //
                  // <Avatar key={index} style={{backgroundColor: dataDetail?.avatarColor, marginRight: 5}}>
                  //   {getInitials(item.full_name)}
                  // </Avatar>
                })
                }
              </ul>

            </div>

            <div style={{...fontWeight, paddingTop: 20}}>Ghi chép nội bộ</div>
            <div>{dataDetail?.note}</div>
          </div>
        </div>
        <div className="footer-left">
          {dataDetail?.date > +moment() ? <>
            {CheckViewAction(schedule_path, "delete")
              ?
              <Button onClick={btnDeleteScheduleClicked} style={{color: "red", marginRight: 10}}><Icon type="delete"
                                                                                                       className="mr-1"/>Xóa</Button>
              : null}

              {CheckViewAction(schedule_path, "update")
              ?
                <Button onClick={event => handleBooking(event)}><Icon type="edit" className="mr-1"/>Chỉnh sửa</Button>

                : null}


          </> : null}

        </div>

      </Modal>
      <BookingForm/>


    </>
  );

}

export default connector(Form.create<IProps>()(DetailScheduleInterview));
