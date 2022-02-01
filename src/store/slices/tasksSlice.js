import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  task: {
    requirements: '',
    budget: '',
    deadline: '',
  },
  isEditMode: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    insertTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    resetTasks(state, action) {
      state.tasks = [];
    },
    setTaskRequirements(state, action) {
      state.task.requirements = action.payload;
    },
    setTaskBudget(state, action) {
      state.task.budget = action.payload;
    },
    setTaskDeadline(state, action) {
      state.task.deadline = action.payload;
    },
    setTaskIsEditMode(state, action) {
      state.isEditMode = action.payload;
    },
    resetTask(state) {
      state.task = {
        ...initialState.task,
      };
    },
  },
});

export const {
  setTasks,
  setTaskRequirements,
  setTaskBudget,
  setTaskDeadline,
  setTaskIsEditMode,
  resetTask,
  insertTask,
  resetTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
