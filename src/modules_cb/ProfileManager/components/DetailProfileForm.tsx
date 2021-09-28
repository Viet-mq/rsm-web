import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormDetail} from "../redux/actions";
import {Avatar, Button, Icon, Select} from "antd";
import React, {useState} from "react";
import {DetailCV} from "../types";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
})

const connector = connect(mapStateToProps,
  {
    showFormDetail,
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface DetailProfileFormProps extends ReduxProps {
}

function DetailProfileForm(props: DetailProfileFormProps) {
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const handeClose = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    let req: DetailCV = {
      show_detail: false,
      general: 24,
      detail: 0
    }
    props.showFormDetail(req);
  }

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  return (
    <div className="detail-container">
      <div className="detail-title">
        <div className="detail-title__left">
          <h1>Hồ Đức Duy</h1>
          <span>Java Candidate Profile</span>
        </div>

        <div className="detail-title__right">
          <Button size="small" className="ant-btn ant-btn-sm">
            Tạo ứng tuyển
          </Button>
          <Button size="small" className="ant-btn mr-1 ant-btn-sm">
            <Icon type="edit"/>
          </Button>
          <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                  onClick={handeClose}
          >
            <Icon type="close"/>
          </Button>
        </div>
      </div>

      <div className="detail-paragraph-1">
        <Avatar src={require('src/assets/images/profile.png')} size={100}/>
        <div className="detail-paragraph-1__name">
          <h2>Hồ Đức Duy</h2>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <Icon type="star" className="ml-1 mr-1"/>
          <span>0.0/5</span>
          <span>0</span>
          <p>evaluations </p>
          <br/>
          <p>No title</p>
          <p>0123456789</p>
          <p>email@email.com</p>
        </div>
      </div>

      <div className="detail-paragraph-2">
        <div className="detail-paragraph-2__title">
          <h1>Thông tin hồ sơ</h1>
        </div>

        <div className="detail-paragraph-2__content">
          <Icon type="mail" className='mr-1'/>
          <span>email@email.com</span><br/>
          <Icon type="phone" className='mr-1'/>
          <span>0213456789</span><br/>
          <Icon type="contacts" className='mr-1'/>
          <span>Không có địa chỉ</span><br/>
          <h1>Social profiles</h1>
        </div>

        <div className="detail-paragraph-2__footer">
          <a>Tìm ứng viên trên facebook</a>
          <a>Tìm theo email</a>
        </div>
      </div>

      <div className="detail-paragraph-3">
        <div className="detail-paragraph-3__title">
          <h1>Thông tin hồ sơ</h1>
        </div>
      </div>

      <div className="detail-paragraph-4">
        <div className="detail-paragraph-4__title">
          <h1>Resumes & CVS</h1>
        </div>
      </div>

      {/*<div>*/}
      {/*  <div>{props.showForm.data_update?.fullName}</div>*/}
      {/*  <div>{props.showForm.data_update?.dateOfApply}</div>*/}
      {/*  <div>{props.showForm.data_update?.hometown}</div>*/}
      {/*  <div>{props.showForm.data_update?.school}</div>*/}
      {/*  <div>{props.showForm.data_update?.phonenumber}</div>*/}
      {/*  <div>{props.showForm.data_update?.email}</div>*/}
      {/*  <div>{props.showForm.data_update?.job}</div>*/}
      {/*  <div>{props.showForm.data_update?.levelJob}</div>*/}
      {/*  <div>{props.showForm.data_update?.cv}</div>*/}
      {/*  <div>{props.showForm.data_update?.sourceCV}</div>*/}
      {/*  <div>{props.showForm.data_update?.hrRef}</div>*/}
      {/*  <div>{props.showForm.data_update?.dateOfApply}</div>*/}
      {/*  <div>{props.showForm.data_update?.cvType}</div>*/}
      {/*</div>*/}
    </div>
  )
}

export default connector(DetailProfileForm);

