import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styles from './Project.module.scss';

const Project = ({ title, description }) => {
  return (
    <div className={styles.project}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <Icon name="circle outline" className={styles.iconComponent} />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>
            {title || 'Project: UniversalDot'}
          </span>
          <span className={styles.description}>
            {description || 'xasCaWH151cx2145Cxwkqp2345pWpqz'}
          </span>
        </div>
        <div className={styles.actions}>
          <Button className={styles.button} icon="ellipsis vertical" basic />
        </div>
      </div>
    </div>
  );
};

Project.displayName = 'Project';

export { Project };
