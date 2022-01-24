/* eslint-disable indent */
import React, { useState } from 'react';
import Board from 'react-trello';
import { Button } from 'semantic-ui-react';
import { TextEditor } from '../';

const KanbanBoard = () => {
  const [open, setOpen] = useState(false);
  const mockData = {
    lanes: [
      {
        id: 'lane1',
        title: 'Backlog',
        label: '2',
        cards: [
          {
            id: 'Card1',
            title: 'Write Blog',
            description: 'Can AI make memes',
            label: '30 mins',
            draggable: false,
          },
          {
            id: 'Card2',
            title: 'Pay Rent',
            description: 'Transfer via NEFT',
            label: '5 mins',
            metadata: { sha: 'be312a1' },
          },
        ],
      },
      {
        id: 'lane2',
        title: 'To Do',
        label: '0',
        cards: [],
      },
      {
        id: 'lane3',
        title: 'In Progress',
        label: '0',
        cards: [],
      },
      {
        id: 'lane4',
        title: 'Done',
        label: '0',
        cards: [],
      },
    ],
  };

  const custom = props => {
    console.log('props lane', props);
    if (props.id === 'lane1') {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>Backlog</div>
          <Button primary onClick={() => setOpen(true)}>
            Add new task
          </Button>
        </div>
      );
    }

    return (
      <div style={{ padding: '0.6rem 0' }}>
        <div>{props.title}</div>
      </div>
    );
  };

  const handleCloseTextEditor = () => {
    setOpen(false);
  };

  return (
    <>
      <Board
        style={{ height: '50vh', background: 'none', padding: '0' }}
        components={{ LaneHeader: custom }}
        data={mockData}
      />
      <TextEditor open={open} onClose={() => handleCloseTextEditor()} />
    </>
  );
};

KanbanBoard.displayName = 'KanbanBoard';

export { KanbanBoard };
