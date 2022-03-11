import React, { useEffect, useState } from 'react';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import styles from './Task.module.scss';
import { useTasks } from '../../hooks';
import { taskCallables } from '../../types';

const Task = ({ id, optionsOnClick }) => {
  const { getTask } = useTasks();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const handleResponse = dataFromResponse =>
        !dataFromResponse.isNone &&
        setData({ taskId: id, ...dataFromResponse.toHuman() });

      getTask(id, handleResponse);
    }
  }, [id, getTask]);

  const OptionsDropdown = () => {
    const trigger = (
      <Button
        className={styles.button}
        // onClick={() => optionsOnClick(data?.taskId)}
        icon="ellipsis vertical"
        basic
      />
    );

    return (
      <Dropdown trigger={trigger} icon={false} direction="left">
        <Dropdown.Menu style={{ top: '48px' }}>
          <Dropdown.Item
            text="Start"
            onClick={() =>
              optionsOnClick(taskCallables.START_TASK, data?.taskId)
            }
          />
          <Dropdown.Item
            text="Complete"
            onClick={() =>
              optionsOnClick(taskCallables.COMPLETE_TASK, data?.taskId)
            }
          />
          <Dropdown.Item text="Update" />
          <Dropdown.Divider />
          <Dropdown.Item
            icon="close"
            text="Delete"
            onClick={() =>
              optionsOnClick(taskCallables.REMOVE_TASK, data?.taskId)
            }
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <>
      <div className={styles.task}>
        <div className={styles.content}>
          <div className={styles.status}>
            <div className={styles.content}>
              {/* <span className={styles.descriptor}>Status: </span>
            <span className={styles.state}>Task</span> */}
              {/* <Button
              className={styles.button}
              onClick={() => optionsOnClick(data?.taskId)}
              icon="ellipsis vertical"
              basic
            /> */}
              <OptionsDropdown />
            </div>
          </div>
          <div className={styles.parentProject}>
            <div className={styles.content}>
              <Icon name="folder outline" className={styles.icon} />
              <span className={styles.title}>{data?.title}</span>
            </div>
          </div>
          <div className={styles.taskDescription}>
            <div className={styles.content}>
              This is where the task description goes.
              <div style={{ marginTop: '1rem' }}>Status: {data?.status}</div>
              <div style={{ marginTop: '1rem' }}>
                Specification: {data?.specification}
              </div>
              <div>budget: {data?.budget}</div>
              <div>Deadline: {data?.deadline}</div>
              <div style={{ wordBreak: 'break-all' }}>
                Initiator: {data?.initiator}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            className={styles.button}
            icon="fork"
            label={{ as: 'a', basic: true, content: '2' }}
            labelPosition="left"
          />
          <Button
            className={styles.button}
            icon="fork"
            label={{ as: 'a', basic: true, content: '11' }}
            labelPosition="left"
          />
        </div>
      </div>
    </>
  );
};

Task.displayName = 'Task';

export { Task };
