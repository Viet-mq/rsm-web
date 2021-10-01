import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createBooking, getBooking, showFormBooking, showFormUpdate, updateBooking} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Icon, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import moment from "moment";
import Loading from "../../../components/Loading";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBooking:state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking:state.profileManager.createBooking,
  showBooking:state.profileManager.showBooking,
})

const connector = connect(mapStateToProps,
  {
    getBooking,
    getListAccount,
    getListStatusCV,
    updateBooking,
    createBooking,
    showFormBooking
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface BookingFormProps extends FormComponentProps, ReduxProps {
}

function BookingForm(props: BookingFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const formItemStyle = {height: '60px'};
  const [idProfile,setIdProfile]=useState('');
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
  useEffect(() => {
    props.getListAccount({page: '', size: ''});
    props.getListStatusCV({page: '', size: ''});
  }, [])

  useEffect(()=>{
    props.getBooking({idProfile:props.showBooking?.idProfile});
  },[props.showBooking.idProfile])


  const dateFormat = 'DD/MM/YYYY';



  return (
    <Modal

    >

    </Modal>
  )
}

export default connector(Form.create<BookingFormProps>()(BookingForm));
