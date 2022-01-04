import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, Col, DatePicker, Form, Icon, Input, InputNumber, Row, Select, Switch} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {CreateBookingRequest, ProfileEntity} from "../../../ProfileManager/types";
import moment from "moment";
import {showFormCreate as showJobFormCreate} from "../../../JobManager/redux/actions";
import 'devextreme/dist/css/dx.light.css';
import ReactQuill from "react-quill";
import {GiFemale, GiMale} from "react-icons/all";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
  listAddress: state.addressManager.list,
  listRecruitment: state.recruitmentManager.list,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  createJob: state.jobManager.create,
})

const connector = connect(mapStateToProps,
  {
    showJobFormCreate,
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function InterviewersForm(props: IProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const formItemHeight = {height: 250}
  const textEditorHeight = {height: 150}
  const [visibleCandidate, setVisibleCandidate] = useState(false)
  const wrapperRef = useRef<any>(null);
  const [keySearch, setKeySearch] = useState(undefined);
  const [listCandidates, setListCandidates] = useState<ProfileEntity[] | any>([]);

  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current?.contains(event.target)) {
        setVisibleCandidate(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);


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
          avatarColor: "setColor()",
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,

        }
        return;
      }
    });

  }

  const getInitials = (name: string) => {
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

  function handleSearchCandidate(e?: any) {
    // console.log(e?.target.value)
    // setKeySearch(e?.target.value)
    // props.searchCandidates({fullName: e?.target.value, recruitment: recruitment, calendar: "notSet", page: 1, size: 15})
    //
  }

  function handleAdd(e: FormEvent, value: any) {
    // props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     const date = new Date(values.date);
    //     const time = new Date(values.timeStart);
    //     const dd = date.getDate();
    //     const mm = date.getMonth() + 1;
    //     const yyyy = date.getFullYear();
    //     const hh = time.getHours();
    //     const minutes = time.getMinutes();
    //     const dateChanged: any = new Date(yyyy, mm - 1, dd, hh, minutes, 0);
    //     const interviewTime: any = new Date(yyyy, mm - 1, dd, hh, minutes + values.interviewTime, 0);
    //     setListCandidates(listCandidates.filter((item: ProfileEntity) => item.id !== value.id));
    //     const newData = {
    //       idProfile: value.id,
    //       fullName: value.fullName,
    //       date: dateChanged * 1,
    //       interviewTime: interviewTime * 1,
    //       avatarColor: value.avatarColor
    //     };
    //     setDatasource([...dataSource, newData]);
    //
    //     return;
    //   }
    // });

  };


  function showScrollCandidate() {
    setVisibleCandidate(!visibleCandidate)
  }

  return (
    <div className="main-content">
      <div style={{padding: "24px 24px 0 24px"}}>
        <div className="schedule-detail-title">Hội đồng tuyển dụng</div>
        <div>Thêm thành viên vào hội đồng tuyển dụng để quản lý và xử lý quy trình tuyển dụng</div>
      </div>
      <div className="c-schedule-interview-popup">
        <div className='ant-col-14 grid-left'>
          <div className="border-bottom" style={{display: 'flex', alignItems: 'flex-start',paddingBottom:15}}>
            <div style={{marginRight: 10}}>
              <Avatar size={25} style={{backgroundColor: "red"}}>
                {getInitials("Hồ Đức Duy")}
              </Avatar>
            </div>

            <div>
              <div>
                <a className="c-list-profile" style={{marginRight: "1px"}}>
                  <span>Hồ Đức Duy</span>
                </a>
              </div>

              <span style={{color: "#B2B2B2",}}>hieunh@edsolabs.com</span>
            </div>
          </div>

          <div>
            <Button onClick={showScrollCandidate}  type={"link"} style={{marginTop: 15, paddingLeft: 0, color: "#02a7f0"}}>
              <Icon type="plus" style={{marginRight: 5}}/>
              Thêm thành viên
            </Button>
            {visibleCandidate ?
              <div ref={wrapperRef} className="dropdown-container">
                <Input onChange={event => handleSearchCandidate(event)} value={keySearch} placeholder="Tìm kiếm ứng viên"/>
                <div className="scroll-label-content">
                  {listCandidates.length !== 0 ? listCandidates.map((item: any, index: any) => {
                    return (<div key={item.id} onClick={event => handleAdd(event, item)}>
                      <a className="label-content">
                        <div style={{marginRight: 10}}>
                          <Avatar src={item.image ? item.image : "#"}
                                  style={{backgroundColor: item?.avatarColor, marginRight: 5}}>
                            {getInitials(item.fullName)}
                          </Avatar>
                        </div>
                        <div>
                          <div>
                            <div className="c-list-profile" style={{marginRight: "1px", fontWeight: 500}}>
                              <span>{item.fullName}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>)
                  }) : <span>Vui lòng nhập  tìm kiếm để tìm thêm thành viên</span>}
                </div>
              </div>
              : null}
          </div>

        </div>
      </div>
    </div>
  );
}

export default connector(Form.create<IProps>()(InterviewersForm));
