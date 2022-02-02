/* eslint-disable indent */
import { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';
import { toast } from 'react-toastify';

import {
  setTasks,
  setTaskRequirements,
  setTaskBudget,
  setTaskDeadline,
  resetTask,
  resetTasks,
  // setTaskIsEditMode,
} from '../store/slices/tasksSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useUtils } from './useUtils';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedAccountKey } = useUser();
  const { setStatus } = useStatus();
  const { transformParams } = useUtils();

  const palletRpc = 'task';
  const callables = useMemo(
    () => ({
      TASKS_OWNED: 'tasksOwned',
      GET_TASK: 'tasks',
      CREATE_TASK: 'createTask',
      START_TASK: 'startTask',
      COMPLETE_TASK: 'completeTask',
      REMOVE_TASK: 'removeTask',
    }),
    []
  );

  // TODO: reformat it to be DRY;
  const taskValues = useSelector(state => state.tasks.task);
  const isEditMode = useSelector(state => state.tasks.isEditMode);
  const tasks = useSelector(state => state.tasks.tasks);

  const resetAllTasks = useCallback(() => dispatch(resetTasks()), [dispatch]);

  const populateTask = useCallback(
    ({ key, value }) => {
      if (key === 'requirements') {
        dispatch(setTaskRequirements(value));
      }
      if (key === 'budget') {
        dispatch(setTaskBudget(value));
      }
      if (key === 'deadline') {
        dispatch(setTaskDeadline(value));
      }
    },
    [dispatch]
  );

  const getTask = useCallback(
    (taskId, responseHandler) => {
      const query = async () => {
        const unsub = await api?.query[palletRpc][callables.GET_TASK](
          taskId,
          responseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api, callables]
  );

  // const getTaskToEdit = useCallback(
  //   taskId => {
  //     const queryResHandler = result => {
  //       if (!result.isNone) {
  //         dispatch(setTaskIsEditMode(true));
  //         dispatch(setTaskRequirements(result.toHuman().requirements));
  //         dispatch(setTaskBudget(result.toHuman().budget));
  //         dispatch(setTaskDeadline(result.toHuman().deadline));
  //       }
  //     };

  //     const query = async () => {
  //       const unsub = await api?.query[palletRpc][callables.GET_TASK](
  //         taskId,
  //         queryResHandler
  //       );
  //       const cb = () => unsub;
  //       cb();
  //     };

  //     query();
  //   },
  //   [api, callables, dispatch]
  // );

  const queryResponseHandler = useCallback(
    result => {
      if (result.isNone) {
        dispatch(setTasks([]));
      }

      dispatch(setTasks(result.toHuman()));
    },
    [dispatch]
  );

  const getAllTasks = useCallback(() => {
    if (selectedAccountKey) {
      const payload = [selectedAccountKey];

      const query = async () => {
        const unsub = await api?.query[palletRpc][callables.TASKS_OWNED](
          ...payload,
          queryResponseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [selectedAccountKey, api, callables, queryResponseHandler]);

  const signedTx = async (actionType, taskPayload) => {
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

    const transformedPayloadForCreate = [
      taskPayload?.requirements || '',
      taskPayload?.budget || '',
      taskPayload?.deadline || '',
    ];

    const transformedPayloadForStartCompleteRemove = [taskPayload];

    let txExecute;

    if (actionType === 'CREATE') {
      txExecute = api.tx[palletRpc][callables.CREATE_TASK](
        ...transformedPayloadForCreate
      );
    }

    if (actionType === 'START') {
      txExecute = api.tx[palletRpc][callables.START_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    if (actionType === 'COMPLETE') {
      txExecute = api.tx[palletRpc][callables.COMPLETE_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    if (actionType === 'REMOVE') {
      txExecute = api.tx[palletRpc][callables.REMOVE_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    const transactionResponseHandler = ({ status }) => {
      const callStatus = status;

      if (callStatus?.isFinalized) {
        getAllTasks();
      }

      console.log('status', status);

      // callStatus?.isFinalized
      //   ? setStatus(
      //       `😉 Finalized. Block hash: ${callStatus?.asFinalized?.toString()}`
      //     )
      //   : callStatus?.isInBlock
      //   ? setStatus(`Is in block true?: ${callStatus?.type}`)
      //   : setStatus(`Current transaction status: ${callStatus?.type}`);

      callStatus?.isFinalized
        ? setStatus('')
        : callStatus?.isInBlock
        ? setStatus(`Is in block true?: ${callStatus?.type}`)
        : setStatus(`Current transaction status: ${callStatus?.type}`);

      if (callStatus?.isInBlock) {
        if (actionType === 'CREATE') {
          toast('Task created...');
        }

        if (actionType === 'START') {
          toast('Task started...');
        }

        if (actionType === 'COMPLETE') {
          toast('Task closed...');
        }

        if (actionType === 'REMOVE') {
          toast('Task deleted...');
        }
      }

      setActionLoading(false);
    };

    const transactionErrorHandler = err =>
      setStatus(`😞 Transaction Failed: ${err.toString()}`);

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const taskAction = async (actionType, taskPayload) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus('Sending...');

    if (actionType === 'CREATE') {
      toast('Creating task...');
    }

    if (actionType === 'START') {
      toast('Initiating task...');
    }

    if (actionType === 'COMPLETE') {
      toast('Closing task...');
    }

    if (actionType === 'REMOVE') {
      toast('Deleting task...');
    }

    setActionLoading(true);

    signedTx(actionType, taskPayload);
    dispatch(resetTask());
  };

  return {
    getTask,
    taskAction,
    actionLoading,
    populateTask,
    taskValues,
    isEditMode,
    getAllTasks,
    tasks,
    resetAllTasks,
  };
};

export { useTasks };
