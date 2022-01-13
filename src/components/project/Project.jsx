import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styles from './Project.module.scss';

const Project = () => {
  return (
    <div className={styles.project}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <Icon name="folder outline" className={styles.iconComponent} />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>Project: UniversalDot</span>
          <span className={styles.description}>
            xasCaWH151cx2145Cxwkqp2345pWpqz
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
