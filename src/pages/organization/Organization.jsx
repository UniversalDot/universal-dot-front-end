import React from 'react';
import Board from 'react-trello';

const Organization = () => {
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

  return (
    <>
      <Board
        data={mockData}
        style={{ height: '50vh', background: 'none', padding: '0' }}
      />
    </>
  );
};

Organization.displayName = 'Organization';

export { Organization };
