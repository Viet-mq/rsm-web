import React from "react";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import 'moment/locale/vi';
import { Calendar, Views } from 'react-big-calendar'
import Events from "../components/Events";


const mapStateToProps = (state: RootState) => ({})

const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {

}

function ReminderManagerPages(props: IProps) {

  return (
    <>
      <div className="c-schedule-container">
        <Calendar
          events={Events}
          step={15}
          timeslots={8}
          localizer={localizer}
          defaultView={Views.WEEK}
          defaultDate={new Date(2015, 3, 12)}
        />

      </div>

    </>
  );
}

export default connector(ReminderManagerPages);
