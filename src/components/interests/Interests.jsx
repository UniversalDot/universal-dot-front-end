import React, { useState, useEffect } from 'react';
import {
  Card,
  Search,
  Label,
  Input,
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import styles from './Interests.module.scss';
import { useProfile } from '../../hooks/useProfile';
import { useStatus } from '../../hooks/useStatus';

import { Events } from '../';

const Interests = () => {
  const [oneInterest, setOneInterest] = useState('');

  const {
    getProfile,
    profileData,
    profileAction,
    populateFormInterests,
    interests,
    actionLoading,
  } = useProfile();
  const { status } = useStatus();

  const onPalletCallableParamChange = e => {
    setOneInterest(e.target.value);
  };

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const TxButton = ({ label, color = 'blue', actionType, loading }) => {
    return (
      <Button
        basic
        color={color}
        type="submit"
        onClick={() => profileAction(actionType)}
        disabled={status && !status.includes('Finalized')}
        loading={loading}
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
    if (e.keyCode === 13) {
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
    <Card fluid raised className={styles.card}>
      <Card.Content>
        {/* <Search className={styles.search} /> */}
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
            {interests.length === 0 && (
              <span>Add an interest to see it here...</span>
            )}
          </div>
        </div>

        <TxButton
          label={profileData ? 'Update profile' : 'Create profile'}
          color={profileData ? 'green' : 'blue'}
          actionType={profileData ? 'UPDATE' : 'CREATE'}
          loading={actionLoading}
        />
        {profileData && (
          <TxButton label="Remove profile" color="red" actionType="REMOVE" />
        )}

        <div style={{ margin: '1rem 0' }}>
          <Label>Status:</Label>
          <Label>{status}</Label>
        </div>

        <div style={{ margin: '2rem 0' }}>
          <Events />
        </div>
      </Card.Content>
    </Card>
  );
};

Interests.displayName = 'Interests';

export { Interests };
