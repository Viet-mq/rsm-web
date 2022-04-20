import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Modal} from "antd";
import React, {useEffect} from "react";
import moment from "moment";
import 'devextreme/dist/css/dx.light.css';
import {getDetailProfile, showFormBooking, showFormDetail} from "../../ProfileManager/redux/actions";
import {ScheduleEntity} from "../types";
import {DetailCV} from "../../ProfileManager/types";
import BookingForm from "../../ProfileManager/components/BookingForm";
import {deleteSchedule} from "../redux/actions";
import {CheckViewAction, schedule_path} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  delete: state.scheduleManager.deleteSchedule,
  profileManager: state.profileManager,

})
const connector = connect(mapStateToProps,
  {
    showFormBooking,
    deleteSchedule,
    showFormDetail,
    getDetailProfile,

  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
  handleClosePopupDetail: () => void;
  visible: boolean,
  dataDetail: ScheduleEntity[] | any,
  idDetail: string
}

function DetailScheduleInterview(props: IProps) {
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const dataDetail = props.dataDetail?.find((item: any) => item.id === props.idDetail)
  const {detail} = props.profileManager;
  const fontWeight = {fontWeight: 500}

  useEffect(() => {
    props.visible && props.getDetailProfile({idProfile: dataDetail?.idProfile});
  }, [props.visible])

  const handleBooking = (event: any, dataBookingDetail: any) => {
    event.stopPropagation();
    props.handleClosePopupDetail()
    props.showFormBooking(true, dataBookingDetail, detail.result, true);
  }

  function btnDeleteScheduleClicked() {
    props.deleteSchedule({id: dataDetail?.id})
    props.handleClosePopupDetail();
  }

  function handleShowDetail(value: any) {
    let req: DetailCV = {
      show_detail: false,
      general: 12,
      detail: 12
    }
    props.showFormDetail(req, value);
    props.handleClosePopupDetail()
  }

  return (
    <>
      <Modal
        zIndex={5}
        maskClosable={false}
        visible={props?.visible}
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
              <div className="main-1__green-dot"/>
              <div className="main-1__job-description">{dataDetail?.recruitmentName}</div>
            </div>
          </div>
          <div className="schedule-detail-content">

            <div style={{...fontWeight}}>Ứng viên</div>
            <div style={{...fontWeight, padding: 0}}>{dataDetail?.fullName}</div>
            <div onClick={() => handleShowDetail(dataDetail?.idProfile)}><a style={{display: "flex"}}>Xem hồ sơ <Icon
              type="arrow-right"
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
              <Button onClick={event => handleBooking(event, dataDetail)}><Icon type="edit" className="mr-1"/>Chỉnh sửa</Button>

              : null}


          </> : null}

        </div>

      </Modal>
      <BookingForm/>


    </>
  );

}

export default connector(Form.create<IProps>()(DetailScheduleInterview));
