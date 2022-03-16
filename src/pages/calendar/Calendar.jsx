import React, { useState } from 'react';
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { PageContainer } from '../../components';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar);

const Calendar = () => {
  const initialEvent = [
    {
      id: 0,
      title: 'Test event... 111',
      start: moment(new Date()).toDate(),
      end: moment(new Date()).add(1, 'day').toDate(),
    },
    {
      id: 1,
      title: 'Test event... 222',
      start: moment(new Date()).add(2, 'day').toDate(),
      end: moment(new Date()).add(3, 'day').toDate(),
    },
    {
      id: 2,
      title: 'Test event... 333',
      start: moment(new Date()).add(4, 'day').toDate(),
      end: moment(new Date()).add(5, 'day').toDate(),
    },
  ];
  const [events, setEvents] = useState(initialEvent);
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [draggedEvent, setDraggedEvent] = useState(null);

  const resizeEvent = ({ event, start, end }) => {
    console.log('resizeEvent', { event, start, end });
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  const handleDragStart = event => {
    console.log('handleDragStart', event);
    setDraggedEvent(event);
  };

  const dragFromOutsideItem = () => {
    return draggedEvent;
  };

  const onDropFromOutside = ({ start, end, allDay }) => {
    console.log('onDropFromOutside', { start, end, allDay });
    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    };

    setDraggedEvent(null);
    moveEvent({ event, start, end });
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    console.log('moveEvent', {
      event,
      start,
      end,
      isAllDay: droppedOnAllDaySlot,
    });
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });

    console.log(
      'next event after move',
      nextEvents.find(ev => ev.id === event.id)
    );

    setEvents(nextEvents);
  };

  return (
    <PageContainer>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        startAccessor="start"
        endAccessor="end"
        // resizableAccessor={() => false}
        style={{ height: 500 }}
        popup
        dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
      />
    </PageContainer>
  );
};

Calendar.displayName = 'Calendar';

export { Calendar };
