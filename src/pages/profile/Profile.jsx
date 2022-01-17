import React from 'react';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { UserQuickInfo, Funds, Interests } from '../../components';
import { useProfile } from '../../hooks/useProfile';

const Profile = () => {
  const { profileData } = useProfile();

  return (
    <>
      {!profileData && (
        <Message info>
          <Message.Header>
            It seems you haven't created a profile yet...
          </Message.Header>
          <Link to="configure">Click here to create your profile.</Link>
        </Message>
      )}
      <UserQuickInfo />
      <Funds />
      <Interests />
    </>
  );
};

Profile.displayName = 'Profile';

export { Profile };
