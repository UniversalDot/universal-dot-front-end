/* eslint-disable indent */
import React, { useEffect } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import styles from './Funds.module.scss';
import { useUser } from '../../hooks/useUser';
import { useSubstrate } from '../../substrate-lib';
import { useDispatch } from 'react-redux';
import { setBalance } from '../../store/slices/accountSlice';

const Funds = () => {
  const { selectedAccountKey, selectedAccountBalance } = useUser();
  const { api } = useSubstrate();
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe;

    if (selectedAccountKey && api) {
      // If the user has selected an address, create a new subscription
      selectedAccountKey &&
        api?.query?.system
          ?.account(selectedAccountKey, balance => {
            dispatch(setBalance(balance.data.free.toHuman()));
          })
          .then(unsub => {
            unsubscribe = unsub;
          })
          .catch(console.error);
    }

    return () => unsubscribe && unsubscribe();
  }, [selectedAccountKey, dispatch, api]);

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
                ${selectedAccountBalance}
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
                ₿{selectedAccountBalance}
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
