import React, { useEffect, useState } from 'react';
import { Feed, Button, Card } from 'semantic-ui-react';
// import styles from './Events.module.scss';
import { useSubstrate } from '../../substrate-lib';

// Events to be filtered from feed
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":0})',
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":1})',
];

const eventName = ev => `${ev.section}:${ev.method}`;
const eventParams = ev => JSON.stringify(ev.data);

const Events = () => {
  const { api } = useSubstrate();
  const [eventFeed, setEventFeed] = useState([]);

  useEffect(() => {
    let unsub = null;
    let keyNum = 0;

    if (api?.query?.system) {
      const allEvents = async () => {
        unsub = await api.query.system.events(events => {
          // loop through the Vec<EventRecord>
          events.forEach(record => {
            // extract the phase, event and the event types
            const { event, phase } = record;

            // show what we are busy with
            const evHuman = event.toHuman();
            const evName = eventName(evHuman);
            const evParams = eventParams(evHuman);
            const evNamePhase = `${evName}::(phase=${phase.toString()})`;

            if (FILTERED_EVENTS.includes(evNamePhase)) return;

            setEventFeed(e => [
              {
                key: keyNum,
                icon: 'bell',
                summary: evName,
                content: evParams,
              },
              ...e,
            ]);

            keyNum += 1;
          });
        });
      };

      allEvents();
    }

    return () => unsub && unsub();
  }, [api.query.system]);

  // eslint-disable-next-line multiline-ternary
  return api?.query?.system?.events ? (
    <Card fluid color="blue">
      <Card.Content style={{ flexGrow: 0 }}>
        <Card.Header>
          Events
          <Button
            basic
            circular
            size="mini"
            color="grey"
            floated="right"
            icon="erase"
            onClick={_ => setEventFeed([])}
          />
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed
          style={{ clear: 'both', overflow: 'auto', maxHeight: 250 }}
          events={eventFeed}
        />
      </Card.Content>
    </Card>
  ) : (
    <div>There are no events...</div>
  );
};

Events.displayName = 'Events';

export { Events };
