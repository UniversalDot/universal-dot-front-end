import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  task: {
    title: '',
    specification: '',
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
    resetTasks(state) {
      state.tasks = [];
    },
    setTaskTitle(state, action) {
      state.task.title = action.payload;
    },
    setTaskSpecification(state, action) {
      state.task.specification = action.payload;
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
  setTaskTitle,
  setTaskSpecification,
  setTaskBudget,
  setTaskDeadline,
  setTaskIsEditMode,
  resetTask,
  resetTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
