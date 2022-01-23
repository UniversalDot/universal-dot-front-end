/* eslint-disable multiline-ternary */
import React from 'react';
import { Message, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserQuickInfo, Funds } from '../../components';
import { useProfile } from '../../hooks/useProfile';

const Profile = () => {
  const { profileData, queryLoading } = useProfile();

  // TODO: should also add !accountLoading type of loader;
  return !queryLoading ? (
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
    <>
      <Dimmer active>
        <Loader size="small">Loading account...</Loader>
      </Dimmer>
    </>
  );
};

Profile.displayName = 'Profile';

export { Profile };
