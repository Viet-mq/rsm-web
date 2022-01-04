import {Button, Col, Icon, Row} from "antd";
import React from "react";
import {RootState} from "../../../redux/reducers";
import {showFormCreateContent, showFormExportContent, showFormImportContent} from "../redux/actions";
import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = ({contentManager: {list}}: RootState) => ({list});
const mapDispatchToProps = {
  showFormCreateContent,
  showFormImportContent,
  showFormExportContent
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function HeaderBar(props: IProps) {

  function handleCreate() {
    props.showFormCreateContent(true);
  }

  function handleExport() {
    props.showFormExportContent(true);
  }

  function handleImport() {
    props.showFormImportContent(true);
  }

  return (
    <div className="entryHeader">
      <Row>
        <Col md={16}>
          <div className="tmp-title-page-size20">Quản lý Content (nội dung)</div>
        </Col>
        <Col className="d-flex" md={8}>
          <div className="tmp-btn">
            <div>
              <Button onClick={handleImport}>
                <Icon type="import"/> Import
              </Button>
            </div>
          </div>
          <div className="tmp-btn">
            <div>
              <Button onClick={handleExport}>
                <Icon type="export"/> Export
              </Button>
            </div>
          </div>
          <div className="tmp-btn">
            <div>
              <Button onClick={handleCreate}>
                <Icon type="edit"/> Tạo Content
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default connector(HeaderBar);
