import { createSlice } from '@reduxjs/toolkit';


const loadFromLocalStorage = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState = {
  tasks: loadFromLocalStorage(), 
};

// Tasks Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks); // Save updated tasks to localStorage
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index >= 0) {
        state.tasks[index] = action.payload;
        saveToLocalStorage(state.tasks); // Save updated tasks to localStorage
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveToLocalStorage(state.tasks); // Save updated tasks to localStorage
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(state.tasks); // Save updated tasks to localStorage
      }
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      saveToLocalStorage(state.tasks); // Save updated tasks to localStorage
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      saveToLocalStorage(state.tasks); // Save updated tasks to localStorage
    },
  },
});

export const { addTask, editTask, deleteTask, toggleCompleted, reorderTasks, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
