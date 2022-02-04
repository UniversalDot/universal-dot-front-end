/* eslint-disable multiline-ternary */
import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useStatus } from '../../hooks/useStatus';
import { useLoader } from '../../hooks/useLoader';

const LoaderFullPage = () => {
  const { message } = useStatus();
  const { loadingProfile, loadingTasks } = useLoader();

  return loadingProfile || loadingTasks ? (
    <Dimmer active>
      <Loader size="small">{message || ''}</Loader>
    </Dimmer>
  ) : (
    <></>
  );
};

LoaderFullPage.displayName = 'LoaderFullPage';

export { LoaderFullPage };
