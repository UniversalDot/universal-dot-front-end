/* eslint-disable multiline-ternary */
import React from 'react';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserQuickInfo, Funds } from '../../components';
import { useProfile } from '../../hooks/useProfile';
import { useLoader } from '../../hooks/useLoader';

const Profile = () => {
  const { profileData } = useProfile();
  const { loadingProfile } = useLoader();

  // TODO: should also add !accountLoading type of loader;
  return !loadingProfile ? (
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
    </>
  ) : (
    <></>
  );
};

Profile.displayName = 'Profile';

export { Profile };
