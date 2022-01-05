import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, Form, Icon, Input} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {showFormCreate as showJobFormCreate} from "../../../JobManager/redux/actions";
import 'devextreme/dist/css/dx.light.css';
import {createSteps, getDataRecruitmentUpdate, searchUser} from "../../redux/actions";
import {UserAccount} from "../../../AccountManager/types";
import {CreateRecruitmentRequest, RecruitmentEntity} from "../../types";
import {useLocation} from "react-router-dom";

const mapStateToProps = (state: RootState) => ({
  showBooking: state.profileManager.showBooking,
  searchUserState: state.recruitmentManager.searchUser,
  createStepsState: state.recruitmentManager.createSteps.request,
  dataUpdate: state.recruitmentManager.update.dataUpdate

})

const connector = connect(mapStateToProps,
  {
    showJobFormCreate,
    searchUser,
    createSteps,
    getDataRecruitmentUpdate

  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function InterviewersForm(props: IProps) {
  const location = useLocation();
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const formItemHeight = {height: 250}
  const textEditorHeight = {height: 150}
  const [visibleCandidate, setVisibleCandidate] = useState(false)
  const wrapperRef = useRef<any>(null);
  const [keySearch, setKeySearch] = useState(undefined);
  const [listUser, setListUser] = useState<UserAccount[] | any>([]);
  const [dataSource, setDatasource] = useState<any>([]);

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
    if(location.pathname.includes("edit")){
      setDatasource(props.dataUpdate?.interviewer)
    }
  }, [props.dataUpdate]);
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

  useEffect(() => {
    setListUser(props.searchUserState.rows);
  }, [props.searchUserState]);

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
    setKeySearch(e?.target.value)
    props.searchUser({name: e?.target.value, page: 1, size: 15})
  }

  function handleAdd(e: FormEvent, value: any) {
    console.log(value)
    setListUser(listUser.filter((item: UserAccount) => item.username !== value.username));
    const newData = ({
      username: value.username,
      fullName: value.fullName,
      email: value.email,
    });
    const found = dataSource?.some((el: any) => el.username === newData.username);
    if (!found) {
      if(location.pathname.includes("edit")){
        if (props.dataUpdate) {
          let req: RecruitmentEntity = {
            ...props.dataUpdate,
            interviewer: dataSource.concat(newData),
          }
          props.getDataRecruitmentUpdate(req)
        }

      }else{
        let req: CreateRecruitmentRequest = ({
          ...props.createStepsState,
          interviewer: dataSource?.map((item: any) => item.username).concat(newData.username),
        })
        props.createSteps(req)
      }

      setDatasource([...dataSource, newData]);
    }
    return;
  };

  function showScrollCandidate() {
    props.searchUser({page: 1, size: 15})
    setVisibleCandidate(!visibleCandidate)
  }

  function handleDelete(values: any) {
    const filterListUser: UserAccount | any = props.searchUserState.rows?.filter((item: any) => item.username === values)
    let req: CreateRecruitmentRequest = ({
      ...props.createStepsState,
      interviewer: dataSource?.filter((item: any) => item.username !== values).map((item: any) => item.username),
    })
    props.createSteps(req)
    setDatasource(dataSource?.filter((item: any) => item.username !== values))
    setListUser(filterListUser.concat(listUser))
  }

  return (
    <div className="main-content">
      <div style={{padding: "24px 24px 0 24px"}}>
        <div className="schedule-detail-title">Hội đồng tuyển dụng</div>
        <div>Thêm thành viên vào hội đồng tuyển dụng để quản lý và xử lý quy trình tuyển dụng</div>
      </div>
      <div className="c-schedule-interview-popup">
        <div className='ant-col-14 grid-left'>
          {dataSource?.map((item: any,index:any) => {
            console.log(dataSource)
            return <div key={index} className="border-bottom flex-space-between-item-center"
                        style={{padding: " 15px 0"}}>
              <div className="flex-items-flex-start">
                <div style={{marginRight: 10}}>
                  <Avatar size={25} style={{backgroundColor: "red"}}>
                    {getInitials(item.fullName)}
                  </Avatar>
                </div>
                <div>
                  <div>
                    <a className="c-list-profile" style={{marginRight: "1px"}}>
                      <span>{item.fullName}</span>
                    </a>
                  </div>

                  <span style={{color: "#B2B2B2"}}>{item.email}</span>
                </div>
              </div>

              <div onClick={() => handleDelete(item.username)} className="icon-delete">
                <Icon type="delete" style={{color: 'red', fontSize: '150%'}}/>
              </div>
            </div>

          })}

          <div>
            <Button onClick={showScrollCandidate} type={"link"}
                    style={{marginTop: 15, paddingLeft: 0, color: "#02a7f0"}}>
              <Icon type="plus" style={{marginRight: 5}}/>
              Thêm thành viên
            </Button>
            {visibleCandidate ?
              <div ref={wrapperRef} className="dropdown-container">
                <Input onChange={event => handleSearchCandidate(event)} value={keySearch}
                       placeholder="Tìm kiếm ứng viên"/>
                <div className="scroll-label-content">
                  {listUser?.length !== 0 ? listUser?.map((item: any, index: any) => {
                    return (<div key={item.username} onClick={event => handleAdd(event, item)}>
                      <a className="label-content">
                        <div style={{marginRight: 10}}>
                          <Avatar size={25} style={{backgroundColor: "red"}}>
                            {getInitials(item.fullName)}
                          </Avatar>
                        </div>

                        <div>
                          <div className="c-list-profile" style={{marginRight: "1px"}}>
                            <span>{item.fullName}</span>
                          </div>

                          <span style={{color: "#B2B2B2",}}>{item.email}</span>
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
