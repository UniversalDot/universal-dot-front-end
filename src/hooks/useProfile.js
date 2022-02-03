/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';

import { setProfile, setFormInterests } from '../store/slices/profileSlice';
import { setQueryLoader } from '../store/slices/loadersSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useUtils } from './useUtils';
import { toast } from 'react-toastify';
import { statusTypes, pallets, profileCallables } from '../types';

const useProfile = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedAccountKey } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { transformParams } = useUtils();

  const profileData = useSelector(state => state.profile.data);
  const interests = useSelector(state => state.profile.form.interests);
  const queryLoading = useSelector(state => state.loaders.queryLoading);

  const populateFormInterests = useCallback(
    interestsArray => {
      dispatch(setFormInterests(interestsArray));
    },
    [dispatch]
  );

  const queryResponseHandler = useCallback(
    result => {
      dispatch(setQueryLoader(false));
      result.isNone
        ? dispatch(setProfile(null))
        : dispatch(setProfile(result.toJSON()));
    },
    [dispatch]
  );

  const getProfile = useCallback(() => {
    dispatch(setQueryLoader(true));
    if (selectedAccountKey) {
      const query = async () => {
        const unsub = await api.query[pallets.PROFILE][
          profileCallables.PROFILES
        ](selectedAccountKey, queryResponseHandler);
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [api, dispatch, selectedAccountKey, queryResponseHandler]);

  const signedTransaction = async actionType => {
    const accountPair =
      selectedAccountKey &&
      keyringState === 'READY' &&
      keyring.getPair(selectedAccountKey);

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
          toast('Profile created successfully!');
        }

        if (actionType === profileCallables.UPDATE_PROFILE) {
          toast('Profile updated successfully!');
        }

        if (actionType === profileCallables.REMOVE_PROFILE) {
          toast('Profile deleted successfully.');
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
      { name: 'interests', optional: false, type: 'Bytes' },
    ];
    const inputParamsForTransformed = () => [
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
      const mockUpdateDataForNow = ['mockData, mockTest'];
      txExecute = api.tx[pallets.PROFILE][profileCallables.UPDATE_PROFILE](
        ...mockUpdateDataForNow
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
      toast('Creating profile...');
    }

    if (actionType === profileCallables.UPDATE_PROFILE) {
      toast('Updating profile...');
    }

    if (actionType === profileCallables.REMOVE_PROFILE) {
      toast('Deleting profile...');
    }

    setStatus(statusTypes.INIT);
    setActionLoading(true);
    dispatch(setFormInterests([]));
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
    queryLoading,
  };
};

export { useProfile };
