/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import {
  Card,
  Label,
  Input,
  Button,
  Icon,
  Message,
  Breadcrumb,
  Grid,
  Placeholder,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './ProfileConfiguration.module.scss';
import { useProfile, useStatus } from '../../hooks';
import { PageContainer } from '../';
import { profileCallables, statusTypes } from '../../types';

const ProfileConfiguration = () => {
  const [oneInterest, setOneInterest] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const {
    profileData,
    profileAction,
    populateFormInterests,
    interests,
    actionLoading,
    setUsername,
    username,
  } = useProfile();
  const { status, setStatus } = useStatus();

  const onPalletCallableParamChange = e => {
    setOneInterest(e.target.value);
  };

  useEffect(() => {
    if (!!status && status === statusTypes.INIT) {
      setShowLoader(true);
    }

    if (!!status && status === statusTypes.IN_BLOCK) {
      setShowLoader(false);
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  }, [status, setStatus]);

  const TxButton = ({ label, color = 'blue', actionType, loading }) => {
    return (
      <Button
        color={color}
        type="submit"
        onClick={() => {
          profileAction(actionType);
          setOneInterest('');
        }}
        loading={loading}
        disabled={showLoader}
      >
        {label}
      </Button>
    );
  };

  const handleAddInterest = () => {
    if (oneInterest.length > 3) {
      populateFormInterests([...interests, oneInterest]);
      setOneInterest('');
    }
  };

  const onEnter = e => {
    if (e.keyCode === 13 && oneInterest.length > 3) {
      populateFormInterests([...interests, oneInterest]);
      setOneInterest('');
    }
  };

  const handleRemoveInterest = interest => {
    populateFormInterests(
      interests.filter(interestItem => interestItem !== interest)
    );
  };

  return (
    <>
      {/* <Breadcrumb size="big" className={styles.breadcrumb}>
        <Breadcrumb.Section link as={Link} to="/profile">
          Profile
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Profile configuration</Breadcrumb.Section>
      </Breadcrumb> */}
      <Card fluid raised className={styles.card}>
        {!showLoader && (
          <Card.Content
            header={profileData ? 'Your profile' : 'Create your profile'}
          />
        )}
        {showLoader && (
          <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Card.Content>
        )}
        {!showLoader && (
          <Card.Content
            description={
              profileData
                ? 'You can update or remove your profile in this panel'
                : 'To create your profile add some interests first.'
            }
          />
        )}
        {showLoader && (
          <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Card.Content>
        )}
        {!showLoader && (
          <Card.Content className={styles.body}>
            {/* <Search className={styles.search} /> */}
            <Grid className={styles.gridContainer}>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Input
                  placeholder="For ex. goodguy123"
                  fluid
                  type="text"
                  label="What's your username:"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Input
                  placeholder="For ex. Web Development"
                  action={{
                    icon: 'plus',
                    onClick: handleAddInterest,
                  }}
                  fluid
                  type="text"
                  label="Enter your interest:"
                  value={oneInterest}
                  onChange={e => onPalletCallableParamChange(e)}
                  onKeyDown={onEnter}
                />
              </Grid.Column>
            </Grid>

            <Grid className={styles.gridContainer}>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Card fluid>
                  <Card.Content header="Your interests" />
                  <Card.Content>
                    <div className={styles.pills}>
                      <div className={styles.selected}>
                        {interests.map((interest, i) => (
                          <Label
                            basic
                            color="blue"
                            style={{ margin: '0.5rem 0.5rem 0.5rem 0' }}
                            key={`${interest}+${i}`}
                          >
                            {interest}
                            <Icon
                              name="delete"
                              onClick={() => handleRemoveInterest(interest)}
                            />
                          </Label>
                        ))}
                        {!profileData && interests.length === 0 && (
                          <span>Your added interests will show up here...</span>
                        )}
                      </div>
                      {profileData && (
                        <div className={styles.options}>
                          <Label
                            basic
                            color="grey"
                            style={{ margin: '0.5rem 0.5rem 0.5rem 0' }}
                          >
                            Interest from the block 1
                            <Icon name="delete" />
                          </Label>
                          <Label
                            basic
                            color="grey"
                            style={{ margin: '0.5rem 0.5rem 0.5rem 0' }}
                          >
                            From the block 2
                            <Icon name="delete" />
                          </Label>
                          <Label
                            basic
                            color="grey"
                            style={{ margin: '0.5rem 0.5rem 0.5rem 0' }}
                          >
                            From the block 3
                            <Icon name="delete" />
                          </Label>
                        </div>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </Card.Content>
        )}
        {showLoader && (
          <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Card.Content>
        )}
        {!showLoader && (
          <Card.Content extra>
            <TxButton
              label={profileData ? 'Update profile' : 'Create profile'}
              color={profileData ? 'green' : 'blue'}
              actionType={
                profileData
                  ? profileCallables.UPDATE_PROFILE
                  : profileCallables.CREATE_PROFILE
              }
              loading={actionLoading}
            />
            {profileData && (
              <TxButton
                label="Remove profile"
                color="red"
                actionType={profileCallables.REMOVE_PROFILE}
              />
            )}
          </Card.Content>
        )}
        {showLoader && (
          <Card.Content extra>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Card.Content>
        )}
      </Card>
      {/* {status && (
        <Message positive={!showLoader} warning={showLoader} icon>
          {showLoader && <Icon name="circle notched" loading />}
          {!showLoader && <Icon name="check" />}
          <Message.Content>
            <Message.Header>Profile status</Message.Header>
            {status}
          </Message.Content>
        </Message>
      )} */}
    </>
  );
};

ProfileConfiguration.displayName = 'ProfileConfiguration';

export { ProfileConfiguration };
