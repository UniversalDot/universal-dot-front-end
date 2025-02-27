/* eslint-disable multiline-ternary */
import React, { useEffect, useMemo } from 'react';
import { Grid, Icon, Label } from 'semantic-ui-react';
import styles from './Timeline.module.scss';
import { Task, Project, Log, Events, LoaderGeneric } from '../';
import { useTasks, useLoader } from '../../hooks';

const Timeline = () => {
  const {
    getAllTasks,
    tasks: allTasksReceived,
    resetAllTasks,
    taskAction,
    actionLoading,
  } = useTasks();

  const { loadingTasks } = useLoader();

  useEffect(() => {
    if (!actionLoading) {
      getAllTasks();
    }
    return () => resetAllTasks();
  }, [actionLoading, getAllTasks, resetAllTasks]);

  const tasks = useMemo(() => {
    const handleOptionsOnClick = (actionType, taskId) => {
      taskAction(actionType, taskId);
    };

    if (allTasksReceived.length === 0) {
      return <div className={styles.noTasks}>No tasks at the moment...</div>;
    }

    return allTasksReceived.map((taskId, i) => {
      return (
        <Task
          id={taskId}
          optionsOnClick={handleOptionsOnClick}
          key={`task#${i}`}
        />
      );
    });
  }, [allTasksReceived, taskAction]);

  const projects = [1, 2, 3].map(testNo => <Project key={testNo} />);

  return (
    <>
      <Grid className={styles.grid} columns={3} stackable>
        <Grid.Row className={styles.row}>
          <Grid.Column className={styles.column}>
            <div className={styles.section}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>
                    <Icon name="tasks" className={styles.icon} />
                    Upcoming Tasks
                  </span>
                </div>
                <div className={styles.body}>
                  {loadingTasks || actionLoading ? <LoaderGeneric /> : tasks}
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.column}>
            <div className={styles.section}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>
                    <Icon
                      name="list alternate outline"
                      className={styles.icon}
                    />
                    Active Projects
                  </span>
                </div>
                <div className={styles.body}>{projects}</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.column}>
            <div className={styles.section}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>
                    <Icon name="clock outline" className={styles.icon} />
                    Log
                  </span>
                </div>
                <div className={styles.body}>
                  <div className={styles.date}>
                    <Label as="a" color="blue">
                      Today
                    </Label>
                    <Events />
                  </div>
                  {/* <div className={styles.date}>
                    <Label as="a" color="blue">
                      Today
                    </Label>
                    {logs1}
                  </div>

                  <div className={styles.date}>
                    <Label as="a" color="blue">
                      Yesterday
                    </Label>
                    {logs2}
                  </div>
                  <div className={styles.date}>
                    <Label as="a" color="blue">
                      13.05.2022
                    </Label>
                        <Log
                          isFirst
                          isLast={false}
                        />
                        <Log
                          isFirst={false}
                          isLast
                        />
                  </div> */}
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

Timeline.displayName = 'Timeline';

export { Timeline };
