/* eslint-disable indent */
import { useCallback, useState } from 'react';
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
import { statusTypes, pallets, taskCallables } from '../types';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedAccountKey } = useUser();
  const { setStatus, setStatusMessage } = useStatus();

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
        const unsub = await api?.query[pallets.TASK][taskCallables.GET_TASK](
          taskId,
          responseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
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
  //       const unsub = await api?.query[pallets.TASK][taskCallables.GET_TASK](
  //         taskId,
  //         queryResHandler
  //       );
  //       const cb = () => unsub;
  //       cb();
  //     };

  //     query();
  //   },
  //   [api, dispatch]
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
        const unsub = await api?.query[pallets.TASK][taskCallables.TASKS_OWNED](
          ...payload,
          queryResponseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [selectedAccountKey, api, queryResponseHandler]);

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

    if (actionType === taskCallables.CREATE_TASK) {
      txExecute = api.tx[pallets.TASK][actionType](
        ...transformedPayloadForCreate
      );
    }

    if (actionType === taskCallables.START_TASK) {
      txExecute = api.tx[pallets.TASK][taskCallables.START_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    if (actionType === taskCallables.COMPLETE_TASK) {
      txExecute = api.tx[pallets.TASK][taskCallables.COMPLETE_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    if (actionType === taskCallables.REMOVE_TASK) {
      txExecute = api.tx[pallets.TASK][taskCallables.REMOVE_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    const transactionResponseHandler = ({ status }) => {
      const callStatus = status;

      if (callStatus?.isFinalized) {
        getAllTasks();
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
        if (actionType === taskCallables.CREATE_TASK) {
          toast('Task created successfully!');
        }

        if (actionType === taskCallables.START_TASK) {
          toast('Task started successfully!');
        }

        if (actionType === taskCallables.COMPLETE_TASK) {
          toast('Task closed successfully!');
        }

        if (actionType === taskCallables.REMOVE_TASK) {
          toast('Task deleted successfully!');
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

  const taskAction = async (actionType, taskPayload) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus(statusTypes.INIT);

    if (actionType === taskCallables.CREATE_TASK) {
      toast('Creating task...');
    }

    if (actionType === taskCallables.START_TASK) {
      toast('Initiating task...');
    }

    if (actionType === taskCallables.COMPLETE_TASK) {
      toast('Closing task...');
    }

    if (actionType === taskCallables.REMOVE_TASK) {
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
