/* eslint-disable multiline-ternary */
import React from 'react';
import { Loader } from 'semantic-ui-react';
import styles from './LoaderGeneric.module.scss';

const LoaderGeneric = ({ text }) => {
  return (
    <div className={styles.loaderContainer}>
      <Loader active inline>
        {text || ''}
      </Loader>
    </div>
  );
};

LoaderGeneric.displayName = 'LoaderGeneric';

export { LoaderGeneric };
