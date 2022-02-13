/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';
// import {} from '../store/slices/daoSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useLoader } from './useLoader';
import {
  statusTypes,
  pallets,
  toastTypes,
  loadingTypes,
  daoCallables,
} from '../types';
import { useToast } from './useToast';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedAccountKey } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { setLoading } = useLoader();
  const { toast } = useToast();

  const signedTx = async (actionType, daoPayload) => {
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

    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadAddMembers = [
      daoPayload?.organizationName || '',
      daoPayload?.accountId || '',
    ];

    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadAddTasks = [
      daoPayload?.organizationName || '',
      daoPayload?.taskId || '',
    ];

    const transformedPayloadCreateOrg = [daoPayload];
    // TODO: should accept more data (title, desc, etc.) not just visionDocument;
    const transformedPayloadCreateVision = [daoPayload];
    // TODO: payload is orgName, but should be refactored to orgId in BE;
    const transformedPayloadDissolveOrg = [daoPayload];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveMembers = [
      daoPayload?.organizationName || '',
      daoPayload?.accountId || '',
    ];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveTasks = [
      daoPayload?.organizationName || '',
      daoPayload?.taskId || '',
    ];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadRemoveVision = [daoPayload];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadSignVision = [daoPayload];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadUnsignVision = [daoPayload];

    let txExecute;

    if (actionType === daoCallables.ADD_MEMBERS) {
      txExecute = api.tx[pallets.DAO][daoCallables.ADD_MEMBERS](
        ...transformedPayloadAddMembers
      );
    }

    if (actionType === daoCallables.ADD_TASKS) {
      txExecute = api.tx[pallets.DAO][daoCallables.ADD_TASKS](
        ...transformedPayloadAddTasks
      );
    }

    if (actionType === daoCallables.CREATE_ORGANIZATION) {
      txExecute = api.tx[pallets.DAO][daoCallables.CREATE_ORGANIZATION](
        ...transformedPayloadCreateOrg
      );
    }

    if (actionType === daoCallables.CREATE_VISION) {
      txExecute = api.tx[pallets.DAO][daoCallables.CREATE_VISION](
        ...transformedPayloadCreateVision
      );
    }

    if (actionType === daoCallables.DISSOLVE_ORGANIZATION) {
      txExecute = api.tx[pallets.DAO][daoCallables.DISSOLVE_ORGANIZATION](
        ...transformedPayloadDissolveOrg
      );
    }

    if (actionType === daoCallables.REMOVE_MEMBERS) {
      txExecute = api.tx[pallets.DAO][daoCallables.REMOVE_MEMBERS](
        ...transformedPayloadRemoveMembers
      );
    }

    if (actionType === daoCallables.REMOVE_TASKS) {
      txExecute = api.tx[pallets.DAO][daoCallables.REMOVE_TASKS](
        ...transformedPayloadRemoveTasks
      );
    }

    if (actionType === daoCallables.REMOVE_VISION) {
      txExecute = api.tx[pallets.DAO][daoCallables.REMOVE_VISION](
        ...transformedPayloadRemoveVision
      );
    }

    if (actionType === daoCallables.SIGN_VISION) {
      txExecute = api.tx[pallets.DAO][daoCallables.SIGN_VISION](
        ...transformedPayloadSignVision
      );
    }

    if (actionType === daoCallables.UNSIGN_VISION) {
      txExecute = api.tx[pallets.DAO][daoCallables.UNSIGN_VISION](
        ...transformedPayloadUnsignVision
      );
    }

    const transactionResponseHandler = ({ status }) => {
      const callStatus = status;

      if (callStatus?.isFinalized) {
        // TODO: make a call to repopulate state with latest changes from the blockchain;
      }

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
        if (actionType === daoCallables.ADD_MEMBERS) {
          toast(
            'Member added to organization successfully!',
            toastTypes.SUCCESS
          );
        }

        if (actionType === daoCallables.ADD_TASKS) {
          toast('Task added to organization successfully!', toastTypes.SUCCESS);
        }

        if (actionType === daoCallables.CREATE_ORGANIZATION) {
          toast('Organization created successfully!', toastTypes.SUCCESS);
        }

        if (actionType === daoCallables.CREATE_VISION) {
          toast('Vision created successfully!', toastTypes.SUCCESS);
        }

        if (actionType === daoCallables.DISSOLVE_ORGANIZATION) {
          toast('Organization dissolved successfully!', toastTypes.SUCCESS);
        }

        if (actionType === daoCallables.REMOVE_MEMBERS) {
          toast(
            'Member deleted from organization successfully!',
            toastTypes.SUCCESS
          );
        }

        if (actionType === daoCallables.REMOVE_TASKS) {
          toast(
            'Task deleted from organization successfully!',
            toastTypes.SUCCESS
          );
        }

        if (actionType === daoCallables.REMOVE_VISION) {
          toast('Vision deleted successfully!', toastTypes.SUCCESS);
        }

        if (actionType === daoCallables.SIGN_VISION) {
          toast('Vision signed successfully!', toastTypes.SUCCESS);
        }

        if (actionType === daoCallables.UNSIGN_VISION) {
          toast('Vision unsigned successfully!', toastTypes.SUCCESS);
        }
      }

      setActionLoading(false);
    };

    const transactionErrorHandler = err => {
      setStatus(statusTypes.ERROR);
      setStatusMessage(err.toString());
    };

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const daoAction = async (actionType, daoPayload) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus(statusTypes.INIT);

    toast('Working on your request...', toastTypes.INFO);

    setActionLoading(true);

    signedTx(actionType, daoPayload);
  };

  return {
    daoAction,
    actionLoading,
  };
};

export { useTasks };
