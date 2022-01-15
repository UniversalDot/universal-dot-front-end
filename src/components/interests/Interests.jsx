import React, { useState, useEffect } from 'react';
import { Card, Search, Label, Input, Button } from 'semantic-ui-react';
import styles from './Interests.module.scss';
import { useSubstrate } from '../../substrate-lib';

const Interests = () => {
  const { api } = useSubstrate();

  const [oneInterest, setOneInterest] = useState('');

  useEffect(() => {
    if (api) {
      console.log('api?.tx?', api?.tx);
      const callables = Object.keys(api?.tx?.profile)
        .sort()
        .map(c => ({ key: c, value: c, text: c }));

      console.log('callables', callables);
    }
  }, [api]);

  const cols = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1,
  ];
  const cols2 = [1, 1, 1, 1, 1, 1];
  const columns = cols.map((_, i) => (
    <Label basic color="blue" style={{ margin: '0.5rem' }} key={i}>
      Blue
    </Label>
  ));

  const columns2 = cols2.map((_, i) => (
    <Label basic color="grey" style={{ margin: '0.5rem' }} key={i}>
      Blue
    </Label>
  ));

  const onPalletCallableParamChange = e => {
    setOneInterest(e.target.value);
  };

  const TxButton = ({ label, color = 'blue', type }) => {
    return (
      <Button
        basic
        color={color}
        type="submit"
        onClick={() => console.log('clicked')}
        disabled={false}
      >
        {label}
      </Button>
    );
  };

  return (
    <Card fluid raised className={styles.card}>
      <Card.Content>
        <div>
          <Input
            placeholder="placeholder"
            fluid
            type="text"
            label="label"
            // state={{ ind, paramField }}
            value={oneInterest || ''}
            onChange={e => onPalletCallableParamChange(e)}
          />
          <TxButton label="Create profile" type="SIGNED-TX" color="blue" />
        </div>
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
