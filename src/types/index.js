export const statusTypes = {
  INIT: 'INIT',
  IN_BLOCK: 'IN_BLOCK',
  FINALIZED: 'FINALIZED',
  ERROR: 'ERROR',
};

export const loadingTypes = {
  PROFILE: 'profile',
  TASKS: 'tasks',
  DAO: 'dao',
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

export const daoCallables = {
  ADD_MEMBERS: 'addMembers',
  ADD_TASKS: 'addTasks',
  CREATE_ORGANIZATION: 'createOrganization',
  CREATE_VISION: 'createVision',
  DISSOLVE_ORGANIZATION: 'dissolveOrganization',
  REMOVE_MEMBERS: 'removeMembers',
  REMOVE_TASKS: 'removeTasks',
  REMOVE_VISION: 'removeVision',
  SIGN_VISION: 'signVision',
  UNSIGN_VISION: 'unsignVision',
  // QUERY callables:
  MEMBER_OF: 'memberOf',
  ORGANIZATION_COUNT: 'organizationCount',
  VISION: 'vision',
  VISION_COUNT: 'visionCount',
};
