import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA.js';

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const questions = await _getQuestions();
  return questions;
});

export const saveQuestion = createAsyncThunk('questions/saveQuestion', async (question) => {
  const savedQuestion = await _saveQuestion(question);
  return savedQuestion;
});

export const saveQuestionAnswer = createAsyncThunk('questions/saveQuestionAnswer', async (answerData) => {
  await _saveQuestionAnswer(answerData);
  return answerData;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state.questions[action.payload.id] = action.payload;
      })
      .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
        const { qid, answer, authedUser } = action.payload;
        if (state.questions[qid]) {
          state.questions[qid][answer].votes.push(authedUser);
        }
      });
  },
});

export default questionsSlice.reducer;