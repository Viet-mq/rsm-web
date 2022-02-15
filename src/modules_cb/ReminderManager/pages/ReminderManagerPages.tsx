import React, {useEffect, useState} from "react";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
// import 'moment/locale/vi';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateReminderForm from "../components/CreateReminderForm";
import UpdateReminderForm from "../components/UpdateReminderForm";
import Loading from "../../../components/Loading";
import {getListReminder, showFormCreateReminder, showFormUpdateReminder} from "../redux/actions";
import {ReminderConvertEntity, TimeReminder, UpdateReminderRequest} from "../types";


const mapStateToProps = (state: RootState) => ({
  reminderManager: state.reminderManager,

})

const connector = connect(mapStateToProps, {
  showFormCreateReminder,
  getListReminder,
  showFormUpdateReminder
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ReminderManagerPages(props: IProps) {
  const {createReminder, updateReminder, listReminder} = props.reminderManager
  const localizer = momentLocalizer(moment);
  const [eventReminder, setEventReminder] = useState<ReminderConvertEntity[]>([]);

  useEffect(() => {
    props.getListReminder();
  }, [])

  useEffect(() => {
    changeFormatEvent()
  }, [listReminder.rows])

  function changeFormatEvent() {
    if (listReminder.rows) {
      const newEvent: ReminderConvertEntity[] = [];
      listReminder.rows?.rows.map((item: any) => {
        newEvent.push({
          title: item.title,
          start: new Date(item.start),
          end: new Date(item.end),
          desc: item.desc,
          id: item.id,
        })
      })
      setEventReminder(newEvent)
    }
  }

  function handleSelect({start, end}: any) {
    let req: TimeReminder = ({
      start: start * 1,
      end: end * 1,
    })
    props.showFormCreateReminder(true, req)
    // const title = window.prompt('New Event name')
    // if (title) setEventReminder([...eventReminder, {start, end, title}])
    //
  }

  function handleSelectEvent(event: any) {
    console.log(event)
    let req: UpdateReminderRequest = ({
      start: event.start * 1,
      end: event.end * 1,
      title: event.title,
      desc: event.desc,
      id: event.id,
    })
    props.showFormUpdateReminder(true, req)
  }

  console.log(eventReminder)
  return (
    <>
      <div className=" status-cv-container">
        <Calendar
          selectable
          onSelectSlot={handleSelect}
          onSelectEvent={event => handleSelectEvent(event)}
          events={eventReminder}
          step={15}
          timeslots={8}
          localizer={localizer}
          defaultView={Views.WEEK}
          defaultDate={new Date()}
        />
      </div>

      <CreateReminderForm/>
      <UpdateReminderForm/>

      {createReminder.loading ||
      updateReminder.loading ?
        <Loading/> : null}
    </>
  );
}

export default connector(ReminderManagerPages);
