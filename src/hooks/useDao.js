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
import {
  setTotalOrganizations,
  setTotalVisions,
  setJoinedOrganizations,
  setSuggestedVisions,
  setVisionName as setVisionNameForAnAction,
  setOrganizationName as setOrganizationNameForAnAction,
  setMemberOrTask as setMemberOrTaskForAnAction,
  setApplicants as setApplicantsToOrg,
  resetState,
} from '../store/slices/daoSlice';

const useDao = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedKeyring } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { setLoading } = useLoader();
  const { toast } = useToast();

  const totalOrganizations = useSelector(state => state.dao.totalOrganizations);
  const totalVisions = useSelector(state => state.dao.totalVisions);
  const joinedOrganizations = useSelector(
    state => state.dao.joinedOrganizations
  );
  const suggestedVisions = useSelector(state => state.dao.suggestedVisions);
  const visionNameForAction = useSelector(
    state => state.dao.visionNameForAction
  );
  const organizationNameForAction = useSelector(
    state => state.dao.organizationNameForAction
  );
  const memberOrTaskForAction = useSelector(
    state => state.dao.memberOrTaskForAction
  );
  const allApplicants = useSelector(
    state => state.dao.applicantsToOrganization
  );

  const setVisionName = visionName => {
    dispatch(setVisionNameForAnAction(visionName));
  };

  const setOrganizationName = orgName => {
    dispatch(setOrganizationNameForAnAction(orgName));
  };

  const setMemberOrTask = memberOrTaskId => {
    dispatch(setMemberOrTaskForAnAction(memberOrTaskId));
  };

  const resetFields = () => {
    dispatch(resetState());
  };

  const handleQueryResponse = (dataFromResponse, daoQueryType) => {
    if (!dataFromResponse.isNone) {
      switch (daoQueryType) {
        // TODO: wait for fixed data type from BE, mocked meanwhile:
        case daoCallables.MEMBER_OF:
          dispatch(
            setJoinedOrganizations([
              'Organization 1',
              'Organization 2',
              'Organization 3',
            ])
          );
          break;
        case daoCallables.ORGANIZATION_COUNT:
          dispatch(setTotalOrganizations(dataFromResponse.toHuman()));
          break;
        case daoCallables.VISION_COUNT:
          dispatch(setTotalVisions(dataFromResponse.toHuman()));
          break;
        case daoCallables.VISION:
          dispatch(setSuggestedVisions(dataFromResponse.toHuman()));
          break;
        case daoCallables.APPLICANTS_TO_ORGANIZATION:
          dispatch(setApplicantsToOrg(dataFromResponse.toHuman()));
          break;
        default:
      }
    }
  };

  const getApplicants = useCallback(
    organizationName => {
      const query = async () => {
        const unsub = await api?.query[pallets.DAO][
          daoCallables.APPLICANTS_TO_ORGANIZATION
        ](organizationName, resData =>
          handleQueryResponse(resData, daoCallables.APPLICANTS_TO_ORGANIZATION)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const getJoinedOrganizations = useCallback(
    (userKey, daoQueryType) => {
      const query = async () => {
        const unsub = await api?.query[pallets.DAO][daoCallables.MEMBER_OF](
          userKey,
          resData => handleQueryResponse(resData, daoQueryType)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const getTotalOrganizations = useCallback(
    daoQueryType => {
      const query = async () => {
        const unsub = await api?.query[pallets.DAO][
          daoCallables.ORGANIZATION_COUNT
        ](resData => handleQueryResponse(resData, daoQueryType));
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const getTotalVisions = useCallback(
    daoQueryType => {
      const query = async () => {
        const unsub = await api?.query[pallets.DAO][daoCallables.VISION_COUNT](
          resData => handleQueryResponse(resData, daoQueryType)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const getSuggestedVisions = useCallback(
    (userKey, daoQueryType) => {
      const query = async () => {
        const unsub = await api?.query[pallets.DAO][daoCallables.VISION](
          userKey,
          resData => handleQueryResponse(resData, daoQueryType)
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  const signedTx = async actionType => {
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

    const fromAcct = await getFromAcct();

    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadAddMembers = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];

    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadAddTasks = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];

    const transformedPayloadCreateOrg = [organizationNameForAction];
    // TODO: should accept more data (title, desc, etc.) not just visionDocument;
    const transformedPayloadCreateVision = [visionNameForAction];
    // TODO: payload is orgName, but should be refactored to orgId in BE;
    const transformedPayloadDissolveOrg = [organizationNameForAction];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveMembers = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];
    // TODO: orgName should be refactored to orgId in BE;
    const transformedPayloadRemoveTasks = [
      organizationNameForAction || '',
      memberOrTaskForAction || '',
    ];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadRemoveVision = [visionNameForAction];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadSignVision = [visionNameForAction];
    // TODO: visionDocument should be refactored to visionId in BE;
    const transformedPayloadUnsignVision = [visionNameForAction];

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

    const transactionResponseHandler = res => {
      const callStatus = res.status;

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
      setVisionName('');
      setOrganizationName('');
      setMemberOrTask('');
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

  const daoAction = async actionType => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus(statusTypes.INIT);

    toast('Working on your request...', toastTypes.INFO);

    setActionLoading(true);

    signedTx(actionType);
  };

  return {
    daoAction,
    actionLoading,
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
    totalOrganizations,
    totalVisions,
    joinedOrganizations,
    suggestedVisions,
    setVisionName,
    visionNameForAction,
    organizationNameForAction,
    memberOrTaskForAction,
    setOrganizationName,
    setMemberOrTask,
    allApplicants,
    getApplicants,
    resetFields,
  };
};

export { useDao };
