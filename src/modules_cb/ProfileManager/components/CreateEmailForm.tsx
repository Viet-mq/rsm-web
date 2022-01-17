import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createBooking, getBooking, showEmailForm, showFormBooking, updateBooking} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect} from "react";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import moment from "moment";
import {CreateBookingRequest, UpdateBookingRequest} from "../types";
import {Editor} from "@tinymce/tinymce-react";
import {getDataRecruitmentUpdate} from "../../RecruitmentManager/redux/actions";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
  listAddress: state.addressManager.list,
  listRecruitment: state.recruitmentManager.list,
})

const connector = connect(mapStateToProps,
  {
    getBooking,
    getListAccount,
    getListStatusCV,
    updateBooking,
    createBooking,
    showFormBooking,
    showEmailForm,
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function CreateEmailForm(props: IProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const interviewTime: any = moment(props.getBookingState.result?.interviewTime)
  const date: any = moment(props.getBookingState.result?.date)
  const diffTime = interviewTime.diff(date, "minutes")

  useEffect(() => {
    if (props.showBooking.show_booking) {
      props.getListAccount({page: 1, size: 100});
      props.getListStatusCV({page: 1, size: 100});
    }
  }, [props.showBooking.show_booking])

  useEffect(() => {
    if (props.showBooking.data_booking?.id) {
      props.getBooking({idProfile: props.showBooking.data_booking?.id});
    }

  }, [props.showBooking.data_booking?.id])


  function onBtnCancelClicked() {
    resetFields();
    props.showEmailForm(false);
  }

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        const date = new Date(values.date);
        const time = new Date(values.timeStart);
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const hh = time.getHours();
        const minutes = time.getMinutes();
        const dateChanged: any = new Date(yyyy, mm - 1, dd, hh, minutes, 0);
        const interviewTime: any = new Date(yyyy, mm - 1, dd, hh, minutes + values.interviewTime, 0);
        console.log("UpdateBooking------------")
        console.log("values.interviewTime:", values.interviewTime)
        console.log("interviewTime:", interviewTime, yyyy, mm, dd, hh, minutes)
        console.log("start:", dateChanged, "end:", interviewTime)
        console.log("-------------------------")
        let req: UpdateBookingRequest = {
          id: props.getBookingState.result?.id,
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
          date: dateChanged * 1,

          // id: props.getBookingState.result?.id,
          // idProfile: props.getBookingState.result?.idProfile,
          // time: values.time * 1,
          // address: values.address,
          // form: values.form,
          // interviewer: values.interviewer,
          // interviewee: values.interviewee,
          // content: values.content,
          // question: values.question,
          // comments: values.comments,
          // evaluation: values.evaluation,
          // status: values.status,
          // reason: values.reason,
          // timeStart: values.timeStart * 1,
          // timeFinish: values.timeFinish * 1,
        }
        props.updateBooking(req);
        return;
      }
    });
  }

  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        const date = new Date(values.date);
        const time = new Date(values.timeStart);
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const hh = time.getHours();
        const minutes = time.getMinutes();
        const dateChanged: any = new Date(yyyy, mm - 1, dd, hh, minutes, 0);
        const interviewTime: any = new Date(yyyy, mm - 1, dd, hh, minutes + values.interviewTime, 0);
        console.log("CreateBooking------------")
        console.log("values.interviewTime:", values.interviewTime)
        console.log("interviewTime:", interviewTime, yyyy, mm, dd, hh, minutes)
        console.log("start:", dateChanged, "end:", interviewTime)
        console.log("-------------------------")
        let req: CreateBookingRequest = {
          idProfile: props.showBooking.data_booking?.id,
          date: dateChanged * 1,
          avatarColor: setColor(),
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
        }
        props.createBooking(req);
        return;
      }
    });

  }

  function handleShowEmailForm() {

  }

  return (
    <>
      <div>
        <div>
          <Modal
            zIndex={2}
            maskClosable={false}
            visible={props.showBooking.show_email}
            centered={true}
            width="700px"
            className="custom"
            afterClose={onBtnCancelClicked}
            onCancel={onBtnCancelClicked}
            footer={""}>

            <div style={{padding: "24px"}}>
              <div className="schedule-detail-title">Email thông báo</div>
            </div>
            <div style={{height: 700, padding: "0 24px 24px", overflow: "auto"}}>
              <div className="font-15-bold-500">Nội dung email gửi cho ứng viên</div>
              <Form>
                <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}}
                           wrapperCol={{span: 24}}>
                  {getFieldDecorator('name', {
                    initialValue: 'Thư xác nhận',
                    rules: [
                      {
                        message: 'Vui lòng nhập tên mẫu',
                        required: true,
                      },
                    ],
                  })(
                    <Input placeholder="Nhập tên mẫu" className="bg-white text-black"/>
                  )}
                </Form.Item>

                <Form.Item className="form-label" label="Tiêu đề mail" labelCol={{span: 24}}
                           wrapperCol={{span: 24}}>
                  {getFieldDecorator('name', {
                    initialValue: "Bạn vừa ứng tuyển vào  [ Tên công ty ]",
                    rules: [
                      {
                        message: 'Vui lòng nhập tiêu đề mail',
                        required: true,
                      },
                    ],
                  })(
                    <Input placeholder="Nhập tiêu đề" className="bg-white text-black"/>
                  )}
                </Form.Item>


                <Form.Item className="form-label " label="Nội dung" labelCol={{span: 24}}
                           wrapperCol={{span: 24}}>
                  {getFieldDecorator('context', {
                    initialValue: '',
                    rules: [
                      {
                        message: 'Vui lòng nhập nội dung',
                        required: true,
                      },
                      // {
                      //   validator: validateReactQuill,
                      // },
                    ],
                  })(
                    <Editor
                      apiKey="b616i94ii3b9vlza43fus93fppxb1yxb8f03gh926u51qhs6"
                      // onInit={(evt, editor) => editorRef.current = editor}
                      init={{
                        menu: {
                          tc: {
                            title: 'Comments',
                            items: 'addcomment showcomments deleteallconversations'
                          }
                        },
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help '
                        ],
                        height: 500,
                        menubar: true,
                        branding: false,
                        toolbar: 'undo redo | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | outdent indent |fontselect fontsizeselect formatselect |    numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                        autosave_interval: '30s',
                        autosave_restore_when_empty: false,
                        autosave_retention: '2m',
                        image_caption: true,
                        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                        toolbar_mode: 'sliding',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                    />
                  )}
                </Form.Item>

              </Form>

              <div className="font-15-bold-500 mt-5 mb-2">Nội dung event gửi cho Hội đồng tuyển dụng</div>

              <div style={{border:"1px solid #dddde4",padding:15}}>
                <div className="flex-items-flex-start">
                  <div className="font-14-bold-500" style={{width:100}}>Đến</div>
                  <div style={{flex:1}}>
                    <Select className="bg-white text-black" style={{...fontWeightStyle,width:"100%"}}
                            mode="multiple"
                            placeholder="Chọn thành viên"
                    >
                      {props.listAccount.rows?.map((item: any, index: any) => (
                        <Option key={index} value={item.username}>{item.fullName}</Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="flex-items-center mt-3">
                  <div className="font-14-bold-500" style={{width:100}}>Thời gian</div>
                  <div style={{flex:1}}>
                    21:45 - 21:55 Ngày 17/01/2022
                  </div>
                </div>

                <div className="flex-items-center mt-3">
                  <div className="font-14-bold-500" style={{width:100}}>Địa điểm</div>
                  <div style={{flex:1}}>
                    Phòng - sdf
                  </div>
                </div>

                <div className="flex-items-center mt-3">
                  <div className="font-14-bold-500" style={{width:100}}>Người tổ chức</div>
                  <div style={{flex:1}}>
                    fsadf fdsf
                  </div>
                </div>

                <div className="flex-items-flex-start mt-3">
                  <div className="font-14-bold-500" style={{width:100}}>Mô tả</div>
                  <div style={{flex:1}}>
                    <TextArea placeholder="Nhập nội dung" style={{height: 120}} className="bg-white text-black"/>

                  </div>
                </div>
              </div>
            </div>

            <div className="footer-right">
              <Button onClick={onBtnCancelClicked} type={"link"}
                      style={{color: "black", marginRight: 15}}>Hủy</Button>
              {/*<Button type={"primary"} onClick={onBtnCreateClicked}>Tạo mới</Button>*/}
              <Button type={"primary"} onClick={handleShowEmailForm}>Đặt lịch và gửi mail</Button>
            </div>

          </Modal>
        </div>

      </div>
    </>
  );
}

export default connector(Form.create<IProps>()(CreateEmailForm));
