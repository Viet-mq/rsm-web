import React, {useState} from "react";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
// import 'moment/locale/vi';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import Events from "../components/Events";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


const mapStateToProps = (state: RootState) => ({})

const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ReminderManagerPages(props: IProps) {
  const localizer = momentLocalizer(moment);
  const [eventReminder, setEventReminder] = useState<any>(Events);
  function handleSelect ({start, end}:any){
    const title = window.prompt('New Event name')
    if (title) setEventReminder([...eventReminder, {start, end, title}])
  }
  console.log(eventReminder)
  return (
    <>
      <div className=" status-cv-container">
        <Calendar
          selectable
          onSelectSlot={handleSelect}
          onSelectEvent={event => alert(event.title)}
          events={eventReminder}
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
