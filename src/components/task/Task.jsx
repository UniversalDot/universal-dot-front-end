import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styles from './Task.module.scss';

const Task = () => {
  return (
    <div className={styles.task}>
      <div className={styles.content}>
        <div className={styles.status}>
          <div className={styles.content}>
            <span className={styles.descriptor}>Status: </span>
            <span className={styles.state}>Task</span>
          </div>
        </div>
        <div className={styles.parentProject}>
          <div className={styles.content}>
            <Icon name="folder outline" className={styles.icon} />
            <span className={styles.title}>Project: UniversalDot</span>
          </div>
        </div>
        <div className={styles.taskDescription}>
          <div className={styles.content}>
            This is where the task description goes.
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
  );
};

Task.displayName = 'Task';

export { Task };
