import React from 'react';

import { PageContainer, Organizations } from '../../components';

const OrganizationOwn = () => {
  return (
    <PageContainer>
      <Organizations type="own" />
    </PageContainer>
  );
};

OrganizationOwn.displayName = 'OrganizationOwn';

export { OrganizationOwn };
