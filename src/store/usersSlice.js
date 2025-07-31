import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../../_DATA.js';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await _getUsers();
  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateUserAnswer: (state, action) => {
      const { userId, questionId, answer } = action.payload;
      if (state.users[userId]) {
        state.users[userId].answers[questionId] = answer;
      }
    },
    addUserQuestion: (state, action) => {
      const { userId, questionId } = action.payload;
      if (state.users[userId]) {
        state.users[userId].questions.push(questionId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateUserAnswer, addUserQuestion } = usersSlice.actions;
export default usersSlice.reducer;