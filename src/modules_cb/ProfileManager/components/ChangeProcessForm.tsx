import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Modal} from "antd";
import React, {useEffect, useState} from "react";
import moment from "moment";
import 'devextreme/dist/css/dx.light.css';
import {createBooking, getBooking, showFormBooking, updateBooking} from "../../ProfileManager/redux/actions";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";

import {DataShowBooking} from "../../ProfileManager/types";
import BookingForm from "../../ProfileManager/components/BookingForm";


const mapStateToProps = (state: RootState) => ({
  delete: state.scheduleManager.deleteSchedule
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

interface IProps extends FormComponentProps, ReduxProps {

}

function ChangeProcessForm(props: IProps) {
  const [visible, setVisible] = useState(false);


  const handleBooking = (event: any) => {
    event.stopPropagation();
    // let req: DataShowBooking = {
    //   id: dataDetail.idProfile,
    //   fullName: dataDetail.fullName
    // }
    // props.showFormBooking(true, req);
    // props.handleClosePopupDetail()
  }
  const fontWeight = {
    fontWeight: 500
  }
  // useEffect(() => setVisible(props?.visible), [props?.visible]);

  function btnDeleteScheduleClicked() {

    // props.handleClosePopupDetail();
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
          // props.handleClosePopupDetail()
        }}
        footer={""}>
        <div className="schedule-detail">
          <div className="schedule-detail-head">
            <div className="schedule-detail-title">Chuyển vòng</div>
          </div>
          <div className="schedule-detail-content">
            <div style={{...fontWeight}}>Vòng tuyển dụng</div>
        
          </div>
        </div>
        <div className="footer-left">
          <Button onClick={btnDeleteScheduleClicked} style={{color: "red", marginRight: 10}}><Icon type="delete"
                                                                                                   className="mr-1"/>Xóa</Button>
          <Button onClick={event => handleBooking(event)}><Icon type="edit" className="mr-1"/>Chỉnh sửa</Button>

        </div>

      </Modal>
      <BookingForm/>


    </>
  );

}

export default connector(Form.create<IProps>()(ChangeProcessForm));
