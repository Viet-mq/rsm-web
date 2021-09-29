import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormDetail} from "../redux/actions";
import {Avatar, Button, Icon, Select} from "antd";
import React, {useState} from "react";
import {DetailCV} from "../types";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
  detail: state.profileManager.detail
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
  console.log("duyhaha1:",props);
  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  return (
    <div className="detail-container">
      <div className="detail-title">
        <div className="detail-title__left">
          <h1>{props.detail.result?.fullName}</h1>
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
          <h2>{props.detail.result?.fullName}</h2>
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
          <p>{props.detail.result?.phoneNumber}</p>
          <p>{props.detail.result?.email}</p>
        </div>
      </div>

      <div className="detail-paragraph-2">
        <div className="detail-paragraph-2__title">
          <h1>Thông tin hồ sơ</h1>
        </div>

        <div className="detail-paragraph-2__content">
          <Icon type="mail" className='mr-1'/>
          <span>{props.detail.result?.email}</span><br/>
          <Icon type="phone" className='mr-1'/>
          <span>{props.detail.result?.phoneNumber}</span><br/>
          <Icon type="contacts" className='mr-1'/>
          <span>{props.detail.result?.hometown||"Không có địa chỉ"}</span><br/>
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

      <div className="detail-paragraph-5">
        <h1>Activity logs</h1>
      </div>

    </div>
  )
}

export default connector(DetailProfileForm);

