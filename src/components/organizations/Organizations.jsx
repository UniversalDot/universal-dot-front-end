/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import { Grid, Icon, Label, Card, Button } from 'semantic-ui-react';
import styles from './Organizations.module.scss';
import { Project, TextEditor } from '..';
import { useUser } from '../../hooks/useUser';
import { useDao } from '../../hooks/useDao';
import { daoCallables } from '../../types';
const Organizations = () => {
  const [open, setOpen] = useState(false);

  const { selectedAccountKey } = useUser();
  const {
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
    totalOrganizations,
    totalVisions,
    joinedOrganizations,
    suggestedVisions,
  } = useDao();

  const projects = [1, 2, 3].map(testNo => <Project key={testNo} />);

  const handleCloseTextEditor = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedAccountKey) {
      // const handleResponse = dataFromResponse =>
      //   !dataFromResponse.isNone &&
      //   setData({ taskId: id, ...dataFromResponse.toHuman() });
      console.log('selectedAccountKey in org', selectedAccountKey);

      getJoinedOrganizations(selectedAccountKey, daoCallables.MEMBER_OF);
      getTotalOrganizations(daoCallables.ORGANIZATION_COUNT);
      getTotalVisions(daoCallables.VISION_COUNT);
      getSuggestedVisions(selectedAccountKey, daoCallables.VISION);
    }
  }, [
    selectedAccountKey,
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
  ]);

  return (
    <>
      <Grid className={styles.gridStats}>
        <Grid.Row className={styles.row}>
          <Grid.Column
            className={styles.column}
            mobile={16}
            tablet={16}
            computer={8}
          >
            <Card fluid raised color="purple" className={styles.card}>
              <Card.Content className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>Total organizations</span>
                  <Button basic className={styles.button}>
                    Details
                  </Button>
                </div>
                <Card.Description className={styles.description}>
                  {totalOrganizations}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
            className={styles.column}
            mobile={16}
            tablet={16}
            computer={8}
          >
            <Card fluid raised color="pink" className={styles.card}>
              <Card.Content className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>Total visions</span>
                  <Button basic className={styles.button}>
                    Details
                  </Button>
                </div>
                <Card.Description className={styles.description}>
                  {totalVisions}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
                <div className={styles.body}>
                  {joinedOrganizations.map(org => (
                    <Project
                      key={org}
                      title={org}
                      description="Lorem ipsum..."
                    />
                  ))}
                </div>
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
                <div className={styles.body}>
                  {suggestedVisions.map(suggVis => (
                    <Project
                      key={suggVis}
                      title={suggVis.substring(0, 12) + '...'}
                      description="Lorem ipsum..."
                    />
                  ))}
                </div>
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
