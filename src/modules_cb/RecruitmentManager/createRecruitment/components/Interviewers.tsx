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
import {getInitials} from "../../../../helpers/utilsFunc";

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
  // const {getFieldDecorator, resetFields} = props.form;
  // const fontWeightStyle = {fontWeight: 400};
  // const dateFormat = 'DD/MM/YYYY';
  // const timeFormat = 'HH:mm';
  // const formItemHeight = {height: 250}
  // const textEditorHeight = {height: 150}
  const isEdit=location.pathname.includes("edit");
  const [visibleCandidate, setVisibleCandidate] = useState(false)
  const wrapperRef = useRef<any>(null);
  const [keySearch, setKeySearch] = useState(undefined);
  const [listUser, setListUser] = useState<UserAccount[] | any>([]);
  const [dataSource, setDatasource] = useState<any>([]);

  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
  }, []);

  useEffect(() => {
    if (isEdit) {
      if (props.dataUpdate?.interviewer?.length) setDatasource(props.dataUpdate?.interviewer)
    }
  }, [props.dataUpdate]);
  //Xử lý hiển thị popup custom
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

  function handleSearchCandidate(e?: any) {
    setKeySearch(e?.target.value)
    props.searchUser({name: e?.target.value, page: 1, size: 15})
  }

  function handleAdd(e: FormEvent, value: any) {
    setListUser(listUser.filter((item: UserAccount) => item.username !== value.username));
    const newData = ({
      username: value.username,
      fullName: value.fullName,
      email: value.email,
    });
    const found = dataSource?.some((el: any) => el.username === newData.username);
    if (!found) {
      if (isEdit) {
        if (props.dataUpdate) {
          let req: RecruitmentEntity = {
            ...props.dataUpdate,
            interviewer: dataSource?.concat(newData),
          }
          props.getDataRecruitmentUpdate(req)
        }

      } else {
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
    const filterListUser: any = props.searchUserState.rows?.filter((item: any) => item.username === values)
    if (isEdit) {
      if (props.dataUpdate) {
        let req: RecruitmentEntity = {
          ...props.dataUpdate,
          interviewer: dataSource?.filter((item: any) => item.username !== values),
        }
        props.getDataRecruitmentUpdate(req)
      }
    } else {
      let req: CreateRecruitmentRequest = ({
        ...props.createStepsState,
        interviewer: dataSource?.filter((item: any) => item.username !== values).map((item: any) => item.username),
      })
      props.createSteps(req)
    }

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
          {dataSource?.map((item: any, index: any) => {
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
                  {listUser?.length !== 0 ? listUser?.map((item: any) => {
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
