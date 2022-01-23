/* eslint-disable indent */
import { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../substrate-lib';

import { setTasks } from '../store/slices/tasksSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useUtils } from './useUtils';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [singleTask, setSingleTask] = useState(null);

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

  const populateTasks = useCallback(
    tasksArray => {
      dispatch(setTasks(tasksArray));
    },
    [dispatch]
  );

  const getAllTasks = useCallback(() => {
    if (selectedAccountKey) {
      const payload = [selectedAccountKey];

      const queryResHandler = result => {
        // TODO: check if result is array;
        result.isNone ? dispatch(setTasks([])) : dispatch(setTasks(result));
      };

      const query = async () => {
        const unsub = await api?.query[palletRpc][callables.TASKS_OWNED](
          ...payload,
          queryResHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [selectedAccountKey, api, dispatch, callables]);

  const getTask = useCallback(
    taskId => {
      // MOCKED;
      taskId =
        '0x4c1ac6d320abd535ed5b345f0ded8b15b1a5f65d693fe381cd3fddb8360a05d3';

      // TODO: for BE: the response object doesn't include the task's own ID in the object; it is useful to have it;
      const queryResHandler = result => {
        result.isNone ? setSingleTask(null) : setSingleTask(result.toString());
      };

      const query = async () => {
        const unsub = await api?.query[palletRpc][callables.GET_TASK](
          taskId,
          queryResHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api, callables]
  );

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

    const fromAcct = await getFromAcct();

    const transformedForCreateTask = transformParams(
      [
        {
          name: 'requirements',
          type: 'Bytes',
          optional: false,
        },
        {
          name: 'budget',
          type: 'u128',
          optional: false,
        },
        {
          name: 'deadline',
          type: 'u64',
          optional: false,
        },
      ],
      [
        {
          type: 'Bytes',
          value: 'webapp',
        },
        {
          type: 'u128',
          value: '12345',
        },
        {
          type: 'u64',
          value: '55555',
        },
      ]
    );

    const transformedForStartOrCompleteOrRemoveTask = transformParams(
      [
        {
          name: 'taskId',
          type: 'H256',
          optional: false,
        },
      ],
      [
        {
          type: 'H256',
          value:
            '0x4c1ac6d320abd535ed5b345f0ded8b15b1a5f65d693fe381cd3fddb8360a05d3',
        },
      ]
    );

    let txExecute;

    if (actionType === 'CREATE') {
      txExecute = transformedForCreateTask
        ? api.tx[palletRpc][callables.CREATE_TASK](...transformedForCreateTask)
        : api.tx[palletRpc][callables.CREATE_TASK]();
    }

    if (actionType === 'START') {
      txExecute = api.tx[palletRpc][callables.START_TASK](
        ...transformedForStartOrCompleteOrRemoveTask
      );
    }

    if (actionType === 'COMPLETE') {
      txExecute = api.tx[palletRpc][callables.COMPLETE_TASK](
        ...transformedForStartOrCompleteOrRemoveTask
      );
    }

    if (actionType === 'REMOVE') {
      txExecute = api.tx[palletRpc][callables.REMOVE_TASK](
        ...transformedForStartOrCompleteOrRemoveTask
      );
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

    signedTx(actionType);
  };

  return {
    getTask,
    singleTask,
    profileAction,
    actionLoading,
  };
};

export { useTasks };
