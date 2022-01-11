import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import styles from './Funds.module.scss';

const Funds = () => {
  return (
    <Grid className={styles.grid}>
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
                <span className={styles.text}>Fiat currency</span>
                <Button basic className={styles.button}>
                  Details
                </Button>
              </div>
              <Card.Description className={styles.description}>
                $500
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
                <span className={styles.text}>Cryptocurrency</span>
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

Funds.displayName = 'Funds';

export { Funds };
