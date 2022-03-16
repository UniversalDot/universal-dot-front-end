/* eslint-disable indent */
import React from 'react';
import styles from './PageContainer.module.scss';

const PageContainer = ({ children }) => {
  return <div className={styles.pageContainer}>{children}</div>;
};

PageContainer.displayName = 'PageContainer';

export { PageContainer };
