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

  const getProfile = useCallback(() => {
    dispatch(setQueryLoader(true));
    if (selectedAccountKey) {
      const queryResHandler = result => {
        dispatch(setQueryLoader(false));
        result.isNone
          ? dispatch(setProfile(null))
          : dispatch(setProfile(result.toString()));
      };
      const query = async () => {
        const unsub = await api.query[palletRpc][callables.PROFILES](
          selectedAccountKey,
          queryResHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [api, dispatch, selectedAccountKey, callables]);

  const signedTx = async actionType => {
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

    const txResHandler = ({ status }) => {
      const callStatus = status;

      callStatus?.isFinalized
        ? setStatus(
            `😉 Finalized. Block hash: ${callStatus?.asFinalized?.toString()}`
          )
        : setStatus(`Current transaction status: ${callStatus?.type}`);
      setActionLoading(false);
    };

    const txErrHandler = err =>
      setStatus(`😞 Transaction Failed: ${err.toString()}`);

    // TODO: verify if I did this correctly;
    const paramFieldsPreparedForTransformed = () => [
      { name: 'interests', optional: false, type: 'Bytes' },
    ];
    const inputParamsPreparedForTransformed = () => [
      { type: 'Bytes', value: interests.join() },
    ];

    const fromAcct = await getFromAcct();
    // transformed can be empty parameters;
    const transformed = transformParams(
      paramFieldsPreparedForTransformed(),
      inputParamsPreparedForTransformed()
    );

    let txExecute;

    if (actionType === 'CREATE') {
      txExecute = transformed
        ? api.tx[palletRpc][callables.CREATE_PROFILE](...transformed)
        : api.tx[palletRpc][callables.CREATE_PROFILE]();
    }

    if (actionType === 'REMOVE') {
      txExecute = api.tx[palletRpc][callables.REMOVE_PROFILE]();
    }

    if (actionType === 'UPDATE') {
      const mockUpdateDataForNow = ['mockData, mockTest'];
      txExecute = transformed
        ? api.tx[palletRpc][callables.UPDATE_PROFILE](...mockUpdateDataForNow)
        : api.tx[palletRpc][callables.UPDATE_PROFILE]();
    }

    const unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);

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
    signedTx(actionType);
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
