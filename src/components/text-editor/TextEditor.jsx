import React, { useState } from 'react';
import { Button, Grid, Header, Segment, Portal } from 'semantic-ui-react';
import styles from './TextEditor.module.scss';

const TextEditor = () => {
  const [open, setOpen] = useState(false);

  // TODO: add rich text editor; accept children as props; make it scrollable; add props for control;

  return (
    <Grid columns={2}>
      <Grid.Column>
        <Button
          content={open ? 'Close Portal' : 'Open Portal'}
          negative={open}
          positive={!open}
          onClick={() => setOpen(!open)}
        />
        <Portal open={open}>
          <Segment
            style={{
              left: '40%',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          >
            <Header>This is an example portal</Header>
            <p>Portals have tons of great callback functions to hook into.</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
            <p>To close, simply click the close button or click away</p>
          </Segment>
        </Portal>
      </Grid.Column>
    </Grid>
  );
};

TextEditor.displayName = 'TextEditor';

export { TextEditor };
