import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Modal, Radio} from "antd";
import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {showAddToTalentPoolForm} from "../redux/actions";
import {AddToTalentPoolRequest} from "../types";
import {addToTalentPool} from "../redux/actions/profile/addToTalentPool";

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  listTalentPools: state.talentPoolManager.list
})

const connector = connect(mapStateToProps,
  {
    showAddToTalentPoolForm,
    addToTalentPool
  })

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function AddToTalentPoolForm(props: IProps) {

  const [talentPool, setTalentPool] = useState<any>('')
  //
  // useEffect(() => {
  //   if (props.profileManager.showForm.show_add_to_talent_pool) {
  //     // props.getListRecruitment({id: props.profileManager.showForm.change_process?.recruitmentId})
  //     setTalentPool(props.profileManager.showForm.change_process?.statusCVId)
  //   }
  // }, [props.profileManager.showForm.show_add_to_talent_pool])

  const handleCloseForm = (event: any) => {
    event.stopPropagation();
    props.showAddToTalentPoolForm(false)
  }

  function btnAddToTalentPoolClicked() {
    let req: AddToTalentPoolRequest = ({
      profileId: props.profileManager.showForm.id_detail,
      talentPoolId: talentPool
    })
    props.addToTalentPool(req)
  }

  function handleChangeTalentPool(event: any) {
    setTalentPool(event.target.value)
  }

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        visible={props.profileManager.showForm.show_add_to_talent_pool}
        centered={true}
        width="530px"
        className="custom"
        afterClose={() => {
        }}
        onCancel={() => {
          props.showAddToTalentPoolForm(false)
        }}
        footer={""}>
        <div className="schedule-detail">
          <div className="schedule-detail-head">
            <div className="schedule-detail-title">Thêm vào kho tiềm năng</div>
          </div>
          <div className="schedule-detail-content">

            <Radio.Group onChange={handleChangeTalentPool} value={talentPool}>
              {props.listTalentPools.rows.map((item: any, index: any) => {
                return <Radio key={index} value={item.id} className="flex-items-center">
                  {item.name}
                </Radio>
              })}
            </Radio.Group>

          </div>
        </div>

        <div className="footer-right">
          <Button onClick={handleCloseForm}>Hủy</Button>
          <Button onClick={btnAddToTalentPoolClicked} type={"primary"} className="ml-2">Thêm</Button>
        </div>
      </Modal>
    </>
  );
}

export default connector(Form.create<IProps>()(AddToTalentPoolForm));
