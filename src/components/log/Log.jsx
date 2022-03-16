import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './Log.module.scss';
import classNames from 'classnames';

const Log = ({ isFirst, isLast }) => {
  const logClasses = classNames({
    [styles.log]: true,
    [styles.isFirst]: isFirst,
    [styles.isLast]: isLast,
  });

  return (
    <div className={logClasses}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.owner}>
            <Icon name="folder outline" className={styles.icon} />
            <span className={styles.title}>Project: UniversalDot</span>
          </div>
          <div className={styles.info}>
            Task <span className={styles.type}>"In Progress"</span> created.
          </div>
        </div>

        <div className={styles.time}>
          <span>3:48 PM</span>
        </div>
      </div>
    </div>
  );
};

Log.displayName = 'Log';

export { Log };
