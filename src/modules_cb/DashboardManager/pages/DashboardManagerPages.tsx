import React, {useEffect} from "react";
import ListDashboard from "../components/list/ListDashboard";
import {Col, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createReminder, showFormCreateReminder} from "../../ReminderManager/redux/actions";

const mapStateToProps = (state: RootState) => ({
  reminderManager: state.reminderManager,
})

const connector = connect(mapStateToProps,
  {
    createReminder,
    showFormCreateReminder
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function DashboardManagerPages(props: IProps) {
  useEffect(() => {
    document.title = "Quản lý vị trí công việc";
  }, []);


  return (
    <div className="contentPage">

      <div className="entryHeader">
        <Row>
          <Col md={16}>
            <div className="tmp-title-page-size20" style={{margin: 0}}>Kết quả tuyển dụng</div>
          </Col>
        </Row>
      </div>

      <ListDashboard/>


    </div>
  );

}

export default connector(DashboardManagerPages);
