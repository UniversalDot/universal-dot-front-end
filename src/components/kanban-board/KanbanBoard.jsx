/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import Board from 'react-trello';
import { Button, Grid, Input } from 'semantic-ui-react';
import { Modal } from '../';
import { useTasks, useStatus } from '../../hooks';

import { statusTypes, taskCallables } from '../../types';
import styles from './KanbanBoard.module.scss';

const KanbanBoard = () => {
  const [open, setOpen] = useState(false);

  const { populateTask, taskValues, taskAction, isEditMode, actionLoading } =
    useTasks();
  const { status, setStatus } = useStatus();

  const [showLoader, setShowLoader] = useState(false);

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
    // console.log('props lane', props);
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

  const handleClose = useCallback(() => setOpen(false), []);

  const handleOnChange = (key, value) => {
    populateTask({
      key,
      value,
    });
  };

  useEffect(() => {
    if (!!status && status === statusTypes.INIT) {
      setShowLoader(true);
    }

    if (!!status && status === statusTypes.IN_BLOCK) {
      setShowLoader(false);
      handleClose();
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  }, [status, setStatus, handleClose]);

  return (
    <>
      <Board
        style={{ height: '50vh', background: 'none', padding: '0' }}
        components={{ LaneHeader: custom }}
        data={mockData}
      />
      <Modal
        open={open}
        onClose={handleClose}
        title="Create task"
        description="Fill the details below to create your task."
        loading={actionLoading || showLoader}
        actionButtonLabel={isEditMode ? 'Update task' : 'Create task'}
        actionButtonColor={isEditMode ? 'green' : 'blue'}
        actionButtonOnClick={() =>
          taskAction(
            isEditMode ? taskCallables.UPDATE_TASK : taskCallables.CREATE_TASK,
            taskValues
          )
        }
        removeButtonLabel="Remove Task"
        removeButtonOnClick={taskCallables.REMOVE_TASK}
        showRemoveButton={isEditMode}
      >
        <Grid className={styles.gridContainer}>
          <Grid.Row>
            <Grid.Column>
              <Input
                placeholder="Enter task title..."
                fluid
                type="text"
                label="Title:"
                value={taskValues?.title || ''}
                onChange={e => handleOnChange('title', e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Input
                placeholder="Enter task specification..."
                fluid
                type="text"
                label="Specification:"
                value={taskValues?.specification || ''}
                onChange={e => handleOnChange('specification', e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Input
                placeholder="Enter task budget..."
                fluid
                type="text"
                label="Budget:"
                value={taskValues?.budget || ''}
                onChange={e => handleOnChange('budget', e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Input
                placeholder="Enter task deadline"
                fluid
                type="text"
                label="Deadline:"
                value={taskValues?.deadline || ''}
                onChange={e => handleOnChange('deadline', e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal>
    </>
  );
};

KanbanBoard.displayName = 'KanbanBoard';

export { KanbanBoard };
