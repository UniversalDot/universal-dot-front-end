import React from 'react';

import { PageContainer, Organizations } from '../../components';

const OrganizationJoined = () => {
  return (
    <PageContainer>
      <Organizations type="joined" />
    </PageContainer>
  );
};

OrganizationJoined.displayName = 'OrganizationJoined';

export { OrganizationJoined };
