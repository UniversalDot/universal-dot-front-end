/* eslint-disable multiline-ternary */
import React from 'react';
import { Message } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import {
  UserQuickInfo,
  Funds,
  ProfileConfiguration,
  PageContainer,
} from '../../components';
import { useProfile, useLoader } from '../../hooks';

const Profile = () => {
  const { profileData } = useProfile();
  const { loadingProfile } = useLoader();

  // TODO: should also add !accountLoading type of loader;
  return !loadingProfile ? (
    <PageContainer>
      <UserQuickInfo />
      <Funds />
      {!profileData && (
        <Message info>
          <Message.Header>
            It seems you haven't created a profile yet...
          </Message.Header>
          {/* <Link to="configure">Click here to create your profile.</Link> */}
          <Message.Content>
            Create your profile in the panel below.
          </Message.Content>
        </Message>
      )}
      <ProfileConfiguration />
    </PageContainer>
  ) : (
    <></>
  );
};

Profile.displayName = 'Profile';

export { Profile };
