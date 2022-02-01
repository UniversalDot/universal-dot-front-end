import React, { useEffect, useMemo } from 'react';
import { Grid, Icon, Label } from 'semantic-ui-react';
import styles from './Timeline.module.scss';
import { Task, Project, Log, Events } from '../';
import { useTasks } from '../../hooks/useTasks';
const Timeline = () => {
  const { getAllTasks, tasks: allTasksReceived } = useTasks();
  const cards = [1, 2, 3, 4, 5];
  const logsArr = [1, 2, 3];
  const logsArr2 = [1, 2];
  const logsArr3 = [1];

  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('allTasksReceived', allTasksReceived);
  }, [allTasksReceived]);

  const tasks = useMemo(() => {
    return allTasksReceived.map((task, i) => {
      console.log('task', task);
      return <Task data={task} key={`task#${i}`} />;
    });
  }, [allTasksReceived]);

  // const tasks = cards.map(testNo => <Task key={testNo} />);
  const projects = cards.map(testNo => <Project key={testNo} />);
  const logs1 = logsArr.map((testNo, i) => (
    <Log
      key={testNo}
      isFirst={i === 0}
      isLast={logsArr.length - 1 === i && logsArr.length > 1}
    />
  ));
  const logs2 = logsArr2.map((testNo, i) => (
    <Log
      key={testNo}
      isFirst={i === 0}
      isLast={logsArr2.length - 1 === i && logsArr2.length > 1}
    />
  ));
  const logs3 = logsArr3.map((testNo, i) => (
    <Log
      key={testNo}
      isFirst={i === 0}
      isLast={logsArr3.length - 1 === i && logsArr3.length > 1}
    />
  ));

  return (
    <>
      <Grid className={styles.grid} columns={3} stackable>
        <Grid.Row className={styles.row}>
          <Grid.Column className={styles.column}>
            <div className={styles.section}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>
                    <Icon name="folder outline" className={styles.icon} />
                    Upcoming Tasks
                  </span>
                </div>
                <div className={styles.body}>{tasks}</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.column}>
            <div className={styles.section}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>
                    <Icon name="folder outline" className={styles.icon} />
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
                    <Icon name="folder outline" className={styles.icon} />
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
                    {logs3}
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
