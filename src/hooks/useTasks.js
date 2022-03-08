/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';
import {
  setTasks,
  setTaskTitle,
  setTaskSpecification,
  setTaskBudget,
  setTaskDeadline,
  resetTask,
  resetTasks,
  // setTaskIsEditMode,
} from '../store/slices/tasksSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useLoader } from './useLoader';
import {
  statusTypes,
  pallets,
  taskCallables,
  toastTypes,
  loadingTypes,
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

  // TODO: reformat it to be DRY;
  const taskValues = useSelector(state => state.tasks.task);
  const isEditMode = useSelector(state => state.tasks.isEditMode);
  const tasks = useSelector(state => state.tasks.tasks);

  const resetAllTasks = useCallback(() => dispatch(resetTasks()), [dispatch]);

  const populateTask = useCallback(
    ({ key, value }) => {
      if (key === 'title') {
        dispatch(setTaskTitle(value));
      }
      if (key === 'specification') {
        dispatch(setTaskSpecification(value));
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
  //         dispatch(setTaskSpecification(result.toHuman().specification));
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
      setLoading({ type: loadingTypes.TASKS, value: false });
      setStatusMessage('');

      if (result.isNone) {
        dispatch(setTasks([]));
      }

      dispatch(setTasks(result.toHuman()));
    },
    [dispatch, setLoading, setStatusMessage]
  );

  const getAllTasks = useCallback(() => {
    setLoading({ type: loadingTypes.TASKS, value: true });
    setStatusMessage('Loading tasks...');
    if (selectedAccountKey) {
      const query = async () => {
        const unsub = await api.query[pallets.TASK][taskCallables.TASKS_OWNED](
          selectedAccountKey,
          queryResponseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [
    selectedAccountKey,
    api,
    queryResponseHandler,
    setLoading,
    setStatusMessage,
  ]);

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
      taskPayload?.title || '',
      taskPayload?.specification || '',
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
          toast('Task created successfully!', toastTypes.SUCCESS);
        }

        if (actionType === taskCallables.START_TASK) {
          toast('Task started successfully!', toastTypes.SUCCESS);
        }

        if (actionType === taskCallables.COMPLETE_TASK) {
          toast('Task closed successfully!', toastTypes.SUCCESS);
        }

        if (actionType === taskCallables.REMOVE_TASK) {
          toast('Task deleted successfully!', toastTypes.SUCCESS);
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
      toast('Creating task...', toastTypes.INFO);
    }

    if (actionType === taskCallables.START_TASK) {
      toast('Initiating task...', toastTypes.INFO);
    }

    if (actionType === taskCallables.COMPLETE_TASK) {
      toast('Closing task...', toastTypes.INFO);
    }

    if (actionType === taskCallables.REMOVE_TASK) {
      toast('Deleting task...', toastTypes.INFO);
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
