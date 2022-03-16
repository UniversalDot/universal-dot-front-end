import React from 'react';

import { PageContainer, KanbanBoard } from '../../components';

const OrganizationKanban = () => {
  return (
    <PageContainer>
      <KanbanBoard />
    </PageContainer>
  );
};

OrganizationKanban.displayName = 'OrganizationKanban';

export { OrganizationKanban };
