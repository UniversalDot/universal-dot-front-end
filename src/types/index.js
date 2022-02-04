export const statusTypes = {
  INIT: 'INIT',
  IN_BLOCK: 'IN_BLOCK',
  FINALIZED: 'FINALIZED',
  ERROR: 'ERROR',
};

export const loadingTypes = {
  PROFILE: 'profile',
  TASKS: 'tasks',
};

export const toastTypes = {
  DEFAULT: '',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warn',
  ERROR: 'error',
};

export const pallets = {
  PROFILE: 'profile',
  TASK: 'task',
  DAO: 'dao',
};

export const profileCallables = {
  PROFILES: 'profiles',
  CREATE_PROFILE: 'createProfile',
  UPDATE_PROFILE: 'updateProfile',
  REMOVE_PROFILE: 'removeProfile',
};

export const taskCallables = {
  TASKS_OWNED: 'tasksOwned',
  GET_TASK: 'tasks',
  CREATE_TASK: 'createTask',
  START_TASK: 'startTask',
  COMPLETE_TASK: 'completeTask',
  REMOVE_TASK: 'removeTask',
  // TODO: not present in BE yet;
  UPDATE_TASK: 'updateTask',
};
