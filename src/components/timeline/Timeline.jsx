import React from 'react';
import { Card, Grid, Button, Icon } from 'semantic-ui-react';
import styles from './Timeline.module.scss';

const Timeline = () => {
  return (
    <Grid className={styles.grid} columns={3} stackable>
      <Grid.Row className={styles.row}>
        <Grid.Column className={styles.column}>
          <Card fluid raised className={styles.card}>
            <Card.Content className={styles.contentContainer}>
              <div className={styles.header}>
                <span className={styles.text}>
                  <Icon name="folder outline" />
                  Upcoming
                </span>
                <Button basic className={styles.button}>
                  Details
                </Button>
              </div>
              <Card.Description className={styles.description}>
                <Card.Group>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>Steve Sanders</Card.Header>
                      <Card.Meta>Friends of Elliot</Card.Meta>
                      <Card.Description>
                        Steve wants to add you to the group{' '}
                        <strong>best friends</strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button basic color="green">
                          Approve
                        </Button>
                        <Button basic color="red">
                          Decline
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>Molly Thomas</Card.Header>
                      <Card.Meta>New User</Card.Meta>
                      <Card.Description>
                        Molly wants to add you to the group{' '}
                        <strong>musicians</strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button basic color="green">
                          Approve
                        </Button>
                        <Button basic color="red">
                          Decline
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>Jenny Lawrence</Card.Header>
                      <Card.Meta>New User</Card.Meta>
                      <Card.Description>
                        Jenny requested permission to view your contact details
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button basic color="green">
                          Approve
                        </Button>
                        <Button basic color="red">
                          Decline
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column className={styles.column}>
          <Card fluid raised className={styles.card}>
            <Card.Content className={styles.contentContainer}>
              <div className={styles.header}>
                <span className={styles.text}>
                  <Icon name="folder outline" />
                  Active
                </span>
                <Button basic className={styles.button}>
                  Details
                </Button>
              </div>
              <Card.Description className={styles.description}>
                ₿ 15
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column className={styles.column}>
          <Card fluid raised className={styles.card}>
            <Card.Content className={styles.contentContainer}>
              <div className={styles.header}>
                <span className={styles.text}>
                  <Icon name="folder outline" />
                  Log
                </span>
                <Button basic className={styles.button}>
                  Details
                </Button>
              </div>
              <Card.Description className={styles.description}>
                ₿ 15
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Timeline.displayName = 'Timeline';

export { Timeline };
