import React from 'react';
import { Button, Grid, Header, Segment, Portal } from 'semantic-ui-react';
import styles from './TextEditor.module.scss';

const TextEditor = ({ open, onClose }) => {
  // TODO: add rich text editor; accept children as props; make it scrollable; add props for control;

  return (
    <Grid columns={2}>
      <Grid.Column>
        <Portal open={open}>
          <Segment
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          >
            <Header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>This is an example portal</span>
              <Button onClick={onClose}>Close</Button>
            </Header>
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
