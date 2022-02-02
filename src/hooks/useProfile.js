/* eslint-disable indent */
import { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';

import { setProfile, setFormInterests } from '../store/slices/profileSlice';
import { setQueryLoader } from '../store/slices/loadersSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useUtils } from './useUtils';

const useProfile = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedAccountKey } = useUser();
  const { setStatus } = useStatus();
  const { transformParams } = useUtils();

  const palletRpc = 'profile';
  const callables = useMemo(
    () => ({
      PROFILES: 'profiles',
      CREATE_PROFILE: 'createProfile',
      UPDATE_PROFILE: 'updateProfile',
      REMOVE_PROFILE: 'removeProfile',
    }),
    []
  );

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
        const unsub = await api.query[palletRpc][callables.PROFILES](
          selectedAccountKey,
          queryResponseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [api, dispatch, selectedAccountKey, callables, queryResponseHandler]);

  const transactionResponseHandler = ({ status }) => {
    const callStatus = status;

    callStatus?.isFinalized
      ? setStatus(
          `😉 Finalized. Block hash: ${callStatus?.asFinalized?.toString()}`
        )
      : callStatus?.isInBlock
      ? setStatus(`Is in block true?: ${callStatus?.type}`)
      : setStatus(`Current transaction status: ${callStatus?.type}`);
    setActionLoading(false);
  };

  const transactionErrorHandler = err =>
    setStatus(`😞 Transaction Failed: ${err.toString()}`);

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

    if (actionType === 'CREATE') {
      txExecute = api.tx[palletRpc][callables.CREATE_PROFILE](...transformed);
    }

    if (actionType === 'REMOVE') {
      txExecute = api.tx[palletRpc][callables.REMOVE_PROFILE]();
    }

    if (actionType === 'UPDATE') {
      const mockUpdateDataForNow = ['mockData, mockTest'];
      txExecute = api.tx[palletRpc][callables.UPDATE_PROFILE](
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

    setStatus('Sending...');
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
