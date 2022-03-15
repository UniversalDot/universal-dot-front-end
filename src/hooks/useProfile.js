/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';

import {
  setProfile,
  setFormInterests,
  setUsername as setUsernameAction,
} from '../store/slices/profileSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useLoader } from './useLoader';
import { useUtils } from './useUtils';
import {
  statusTypes,
  pallets,
  profileCallables,
  toastTypes,
  loadingTypes,
} from '../types';
import { useToast } from './useToast';

const useProfile = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedKeyring } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { setLoading } = useLoader();
  const { transformParams } = useUtils();
  const { toast } = useToast();

  const profileData = useSelector(state => state.profile.data);
  const interests = useSelector(state => state.profile.form.interests);
  const username = useSelector(state => state.profile.form.username);
  const reputationPoints = useSelector(
    state => state.profile?.data?.reputation
  );
  const reputation = reputationPoints?.toString() || 'N/A';

  const populateFormInterests = useCallback(
    interestsArray => {
      dispatch(setFormInterests(interestsArray));
    },
    [dispatch]
  );

  const setUsername = useCallback(
    username => {
      dispatch(setUsernameAction(username));
    },
    [dispatch]
  );

  const queryResponseHandler = useCallback(
    result => {
      setLoading({ type: loadingTypes.PROFILE, value: false });
      setStatusMessage('');

      const setAllData = profileData => {
        dispatch(setProfile(profileData));
        populateFormInterests(profileData?.interests?.split(','));
        setUsername(profileData?.name);
      };

      result.isNone ? dispatch(setProfile(null)) : setAllData(result.toHuman());
    },
    [dispatch, setStatusMessage, setLoading, populateFormInterests, setUsername]
  );

  // TODO: figure out how to make it simpler to check when API is availabile so it doesn't crash;
  const getProfile = useCallback(() => {
    setLoading({ type: loadingTypes.PROFILE, value: true });
    setStatusMessage('Loading account / profile...');
    if (
      selectedKeyring.value &&
      api?.query?.[pallets.PROFILE]?.[profileCallables.PROFILES]
    ) {
      const query = async () => {
        const unsub = await api.query[pallets.PROFILE][
          profileCallables.PROFILES
        ](selectedKeyring.value, queryResponseHandler);
        const cb = () => unsub;
        cb();
      };

      query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api?.query?.[pallets.PROFILE]?.[profileCallables.PROFILES],
    selectedKeyring.value,
    setStatusMessage,
    setLoading,
  ]);

  const signedTransaction = async actionType => {
    const accountPair =
      selectedKeyring.value &&
      keyringState === 'READY' &&
      keyring.getPair(selectedKeyring.value);

    const getFromAcct = async () => {
      const {
        address,
        meta: { source, isInjected },
      } = accountPair;
      let fromAcct;

      // signer is from Polkadot-js browser extension
      if (isInjected) {
        const injected = await web3FromSource(source);
        fromAcct = address;
        api.setSigner(injected.signer);
      } else {
        fromAcct = accountPair;
      }

      return fromAcct;
    };

    const transactionResponseHandler = ({ status }) => {
      const callStatus = status;

      if (callStatus?.isFinalized) {
        setStatus(statusTypes.FINALIZED);
        setTimeout(() => {
          setStatus('');
        }, [5000]);
      }
      if (callStatus?.isInBlock) {
        setStatus(statusTypes.IN_BLOCK);
      }

      if (callStatus?.isInBlock) {
        if (actionType === profileCallables.CREATE_PROFILE) {
          toast('Profile created successfully!', toastTypes.SUCCESS);
        }

        if (actionType === profileCallables.UPDATE_PROFILE) {
          toast('Profile updated successfully!', toastTypes.SUCCESS);
        }

        if (actionType === profileCallables.REMOVE_PROFILE) {
          toast('Profile deleted successfully.', toastTypes.SUCCESS);
        }
      }

      setActionLoading(false);
    };

    const transactionErrorHandler = err => {
      setStatus(statusTypes.ERROR);
      setStatusMessage(err.toString());
    };

    const fromAcct = await getFromAcct();

    // TODO: verify if correct;
    const paramFieldsForTransformed = () => [
      { name: 'username', optional: false, type: 'Bytes' },
      { name: 'interests', optional: false, type: 'Bytes' },
    ];
    const inputParamsForTransformed = () => [
      { type: 'Bytes', value: username },
      { type: 'Bytes', value: interests.join() },
    ];

    const transformed = transformParams(
      paramFieldsForTransformed(),
      inputParamsForTransformed()
    );

    let txExecute;

    if (actionType === profileCallables.CREATE_PROFILE) {
      txExecute = api.tx[pallets.PROFILE][profileCallables.CREATE_PROFILE](
        ...transformed
      );
    }

    if (actionType === profileCallables.REMOVE_PROFILE) {
      txExecute = api.tx[pallets.PROFILE][profileCallables.REMOVE_PROFILE]();
    }

    if (actionType === profileCallables.UPDATE_PROFILE) {
      txExecute = api.tx[pallets.PROFILE][profileCallables.UPDATE_PROFILE](
        ...transformed
      );
    }

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const profileAction = async actionType => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    if (actionType === profileCallables.CREATE_PROFILE) {
      toast('Creating profile...', toastTypes.INFO);
    }

    if (actionType === profileCallables.UPDATE_PROFILE) {
      toast('Updating profile...', toastTypes.INFO);
    }

    if (actionType === profileCallables.REMOVE_PROFILE) {
      toast('Deleting profile...', toastTypes.INFO);
    }

    setStatus(statusTypes.INIT);
    setActionLoading(true);
    populateFormInterests([]);
    setUsername('');
    signedTransaction(actionType);
  };

  return {
    getProfile,
    profileData,
    populateFormInterests,
    interests,
    profileAction,
    actionLoading,
    setActionLoading,
    setUsername,
    username,
    reputation,
  };
};

export { useProfile };
