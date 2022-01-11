import React from 'react';
import { Card, Grid, Button, Search, Label } from 'semantic-ui-react';
import styles from './Interests.module.scss';

const Interests = () => {
  const cols = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  const cols2 = [1, 1, 1, 1, 1, 1];
  const columns = cols.map((_, i) => (
    <Label basic color="blue" style={{ margin: '0.5rem' }}>
      Blue
    </Label>
  ));

  const columns2 = cols2.map((_, i) => (
    <Label basic color="grey" style={{ margin: '0.5rem' }}>
      Blue
    </Label>
  ));

  return (
    <Card fluid raised className={styles.card}>
      <Card.Content>
        <Search className={styles.search} />
        <div className={styles.pills}>
          <div className={styles.selected}>{columns2}</div>
          <div className={styles.options}>{columns}</div>
        </div>
      </Card.Content>
    </Card>
  );
};

Interests.displayName = 'Interests';

export { Interests };
