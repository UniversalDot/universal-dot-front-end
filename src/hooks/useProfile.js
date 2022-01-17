/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';
import utils from '../substrate-lib/utils';

import { useUser } from './useUser';

import { setStatus } from '../store/slices/statusSlice';
import { setProfile, setFormInterests } from '../store/slices/profileSlice';

const useProfile = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedAccountKey } = useUser();

  const profileData = useSelector(state => state.profile.data);
  const interests = useSelector(state => state.profile.form.interests);

  const populateFormInterests = useCallback(
    interestsArray => {
      dispatch(setFormInterests(interestsArray));
    },
    [dispatch]
  );

  const getProfile = useCallback(() => {
    const palletRpc = 'profile';
    const callable = 'profiles';

    if (selectedAccountKey) {
      const payload = [selectedAccountKey];

      const queryResHandler = result => {
        result.isNone
          ? dispatch(setProfile(null))
          : dispatch(setProfile(result.toString()));
      };

      const query = async () => {
        const unsub = await api?.query[palletRpc][callable](
          ...payload,
          queryResHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [selectedAccountKey, api, dispatch]);

  const signedTx = async actionType => {
    const palletRpc = 'profile';
    const callableCreateProfile = 'createProfile';
    const callableRemoveProfile = 'removeProfile';
    const callableUpdateProfile = 'updateProfile';

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

    const transformParams = (
      paramFields,
      inputParams,
      opts = { emptyAsNull: true }
    ) => {
      const isNumType = type =>
        utils.paramConversion.num.some(el => type.indexOf(el) >= 0);
      // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
      //   Otherwise, it will not be added
      const paramVal = inputParams.map(inputParam => {
        // To cater the js quirk that `null` is a type of `object`.
        if (
          typeof inputParam === 'object' &&
          inputParam !== null &&
          typeof inputParam.value === 'string'
        ) {
          return inputParam.value.trim();
        } else if (typeof inputParam === 'string') {
          return inputParam.trim();
        }
        return inputParam;
      });
      const params = paramFields.map((field, ind) => ({
        ...field,
        value: paramVal[ind] || null,
      }));

      return params.reduce((memo, { type = 'string', value }) => {
        if (value == null || value === '') {
          return opts.emptyAsNull ? [...memo, null] : memo;
        }

        let converted = value;

        // Deal with a vector
        if (type.indexOf('Vec<') >= 0) {
          converted = converted.split(',').map(e => e.trim());
          converted = converted.map(single =>
            isNumType(type)
              ? single.indexOf('.') >= 0
                ? Number.parseFloat(single)
                : Number.parseInt(single)
              : single
          );
          return [...memo, converted];
        }

        // Deal with a single value
        if (isNumType(type)) {
          converted =
            converted.indexOf('.') >= 0
              ? Number.parseFloat(converted)
              : Number.parseInt(converted);
        }
        return [...memo, converted];
      }, []);
    };

    const txResHandler = ({ status }) => {
      const callStatus = status;

      callStatus?.isFinalized
        ? dispatch(
            setStatus(
              `😉 Finalized. Block hash: ${callStatus?.asFinalized?.toString()}`
            )
          )
        : dispatch(
            setStatus(`Current transaction status: ${callStatus?.type}`)
          );
      setActionLoading(false);
    };

    const txErrHandler = err =>
      dispatch(setStatus(`😞 Transaction Failed: ${err.toString()}`));

    const paramFieldsPreparedForTransformed = () => [
      { name: 'interests', optional: false, type: 'Bytes' },
    ];
    const inputParamsPreparedForTransformed = () => [
      { type: 'Bytes', value: interests.join() },
    ];

    // Tuka dole e funkcijata, a gore se helperite;

    const fromAcct = await getFromAcct();
    const transformed = transformParams(
      paramFieldsPreparedForTransformed(),
      inputParamsPreparedForTransformed()
    );
    // transformed can be empty parameters

    let txExecute;

    if (actionType === 'CREATE') {
      txExecute = transformed
        ? api.tx[palletRpc][callableCreateProfile](...transformed)
        : api.tx[palletRpc][callableCreateProfile]();
    }

    if (actionType === 'REMOVE') {
      txExecute = api.tx[palletRpc][callableRemoveProfile]();
    }

    if (actionType === 'UPDATE') {
      const mockUpdateDataForNow = ['mockData, mockTest'];
      txExecute = transformed
        ? api.tx[palletRpc][callableUpdateProfile](...mockUpdateDataForNow)
        : api.tx[palletRpc][callableUpdateProfile]();
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
  };
};

export { useProfile };
