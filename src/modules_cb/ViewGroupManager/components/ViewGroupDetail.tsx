import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {Modal, Tree} from "antd";
import React, {useEffect, useState} from "react";
import {showFormMenuFrontEndDetail} from "../redux/actions";

const mapStateToProps = ({viewGroupManager: {showForm}}: RootState) => ({showForm})
const connector = connect(mapStateToProps, {
  showFormMenuFrontEndDetail
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}


function MenuFrontendDetailForm(props: IProps) {
  const [show, setShow] = useState<boolean>(true);
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const formItemStyle = {height: '60px'};

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

  const getChildrenRecursive = (childens: any) => {
    let actions: any = [];
    for (let i = 0; i < childens.length; i++) {
      if (childens[i]?.actions) {
        actions.push({
          title: childens[i]?.actionName,
          key: childens[i]?.actionId,
          children: getChildrenRecursive(childens[i].actions)
        })
      } else {
        actions.push({
          title: childens[i]?.actionName,
          key: childens[i]?.actionId
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

  console.log(props.showForm);
  useEffect(() => {
    const formatTree = convertArrayToTree(props?.showForm?.view?.views);
    setTreeData(formatTree);
    console.log("formatTree", formatTree)
  }, [props?.showForm])


  function onBtnCancelClicked() {
    setCompensatoryDataSource([]);
    props.showFormMenuFrontEndDetail(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật menu"
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

        <Tree
          showLine={true}
          defaultExpandedKeys={["0-0"]}
          treeData={treeData}
        />
      </div>
    </Modal>

  );

}

export default connector(MenuFrontendDetailForm);
