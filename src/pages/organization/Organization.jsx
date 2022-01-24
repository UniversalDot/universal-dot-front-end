import React from 'react';

import { PageContainer, KanbanBoard } from '../../components';

const Organization = () => {
  return (
    <PageContainer>
      <KanbanBoard />
    </PageContainer>
  );
};

Organization.displayName = 'Organization';

export { Organization };
