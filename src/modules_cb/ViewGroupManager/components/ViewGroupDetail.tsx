import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {Button, Icon, Modal, Tree} from "antd";
import React, {useEffect, useState} from "react";
import {showFormActionView, showFormMenuFrontEndDetail} from "../redux/actions";


const mapStateToProps = (state: RootState) => ({
  showForm: state.viewGroupManager.showForm,

})

const connector = connect(mapStateToProps, {
  showFormMenuFrontEndDetail,
  showFormActionView,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function MenuFrontendDetailForm(props: IProps) {
  // const [show, setShow] = useState<boolean>(true);
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  // const formItemStyle = {height: '60px'};
  // const formItemLayout = {
  //   labelCol: {
  //     xs: {span: 24},
  //     sm: {span: 8},
  //   },
  //   wrapperCol: {
  //     xs: {span: 24},
  //     sm: {span: 16},
  //   },
  // };

  const getChildrenRecursive = (childens: any) => {
    let actions: any = [];
    for (let i = 0; i < childens.length; i++) {
      if (childens[i]?.actions) {
        actions.push({
          title: childens[i]?.actionName,
          key: childens[i]?.actionId,
          children: getChildrenRecursive(childens[i].actions),
          disableCheckbox: false,
        })
      } else {
        actions.push({
          title: childens[i]?.actionName,
          key: childens[i]?.actionId,
          disableCheckbox: false,

        })
      }
    }
    return actions;
  }

  const convertArrayToTree = (treeActions: any) => {
    let formatTree = [];
    formatTree = treeActions?.reduce((curr: any, next: any) => {
      const treeObject = {
        title: next.name,
        key: next.id,
        children: getChildrenRecursive(next.actions)
      }
      curr.push(treeObject);
      return curr;
    }, [])
    return formatTree;
  }

  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const formatTree = convertArrayToTree(props?.showForm?.view?.views);
    setTreeData(formatTree);
  }, [props?.showForm])


  function onBtnCancelClicked() {
    setCompensatoryDataSource([]);
    props.showFormMenuFrontEndDetail(false);
  }

  const onCheck = (checkedKeys: any) => {
    console.log('onCheck', checkedKeys);
  };
  console.log("props:",props);
  const HandleCreateView = () => {
    props.showFormActionView(true, props.showForm.view);
  }

  const onBtnRemoveActionView=(e:any)=> {

  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title={"Cập nhật menu view: " + props.showForm.view?.name}
      visible={props.showForm.show_detail}
      centered={true}
      width="550px"
      afterClose={() => {
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        setCompensatoryDataSource([]);
        props.showFormMenuFrontEndDetail(false);
      }}
      footer={""}>
      <div
        style={{
          paddingTop: 0
        }}
      >
        <div className="tmp-btn" style={{textAlign: "end", padding: "0 25px 10px"}}>
          <Button onClick={HandleCreateView}>
            <Icon type="plus"/> Tạo View
          </Button>
        </div>

        <Tree
          checkable
          onCheck={onCheck}
          style={{padding: "0 30px 30px"}}
          defaultExpandedKeys={["0-0"]}
          treeData={treeData}

        />

        <div style={{textAlign: "center"}}>
          <Button className="mr-3 create-btn" htmlType="submit">
            Cập nhật
          </Button>
          <Button  type="danger" className="pl-5 pr-5 mr-3" onClick={event=>onBtnRemoveActionView(event)} >
            Xóa
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </div>

      </div>
    </Modal>

  );

}

export default connector(MenuFrontendDetailForm);
