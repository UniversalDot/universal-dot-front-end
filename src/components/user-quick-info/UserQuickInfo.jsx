import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import styles from './UserQuickInfo.module.scss';
import { useUser } from '../../hooks/useUser';

const UserQuickInfo = () => {
  const { selectedAccountUsername } = useUser();

  return (
    <Card fluid raised className={styles.card}>
      <Card.Content className={styles.contentContainer}>
        <div className={styles.user}>
          <Image
            className={styles.image}
            size="tiny"
            src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
            circular
          />
          <Card.Header className={styles.name}>
            {selectedAccountUsername}
          </Card.Header>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.role}>UX Designer at Designer Hub</div>
        <div className={styles.log}>
          <Icon name="stopwatch" className={styles.icon} />
          <div className={styles.info}>
            <div>8.00 hrs</div>
            <div>This week</div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

UserQuickInfo.displayName = 'UserQuickInfo';

export { UserQuickInfo };
