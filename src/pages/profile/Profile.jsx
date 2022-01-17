import React from 'react';

import { UserQuickInfo, Funds, Interests } from '../../components';

const Profile = () => {
  return (
    <>
      <UserQuickInfo />
      <Funds />
      <Interests />
    </>
  );
};

Profile.displayName = 'Profile';

export { Profile };
