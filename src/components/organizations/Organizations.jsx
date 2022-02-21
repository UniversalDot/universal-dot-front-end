/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import { Grid, Icon, Label } from 'semantic-ui-react';
import styles from './Organizations.module.scss';
import { Project, TextEditor } from '..';

const Organizations = () => {
  const [open, setOpen] = useState(false);

  const projects = [1, 2, 3].map(testNo => <Project key={testNo} />);

  const handleCloseTextEditor = () => {
    setOpen(false);
  };

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
                    Joined organizations
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
                    Signed visions
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
                    Suggested visions
                  </span>
                </div>
                <div className={styles.body}>{projects}</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <TextEditor open={open} onClose={() => handleCloseTextEditor()} />
    </>
  );
};

Organizations.displayName = 'Organizations';

export { Organizations };
