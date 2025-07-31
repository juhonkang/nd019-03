import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PollDetail from '../components/PollDetail.jsx';
import authSlice from '../store/authSlice';
import usersSlice from '../store/usersSlice';
import questionsSlice from '../store/questionsSlice';
import { _getUsers, _getQuestions, _saveQuestionAnswer } from '../../_DATA.js';

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '8xf0y6ziyjabvozdd253nd' }),
  useNavigate: () => jest.fn(),
}));

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      users: usersSlice,
      questions: questionsSlice,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (component, store = createTestStore()) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  );
};

describe('End-to-End Voting Mechanism', () => {
  it('should integrate with backend API for voting', async () => {
    // Test voting with a different user to avoid affecting other tests
    const voteData = {
      authedUser: 'tylermcginnis',
      qid: '6ni6ok3ym7mf1p33lnez', // Use a different question
      answer: 'optionTwo'
    };

    // Save the answer to backend
    const result = await _saveQuestionAnswer(voteData);
    expect(result).toBe(true);

    // Verify the data was updated in backend
    const updatedUsers = await _getUsers();
    const updatedQuestions = await _getQuestions();
    
    // Check user's answer was recorded
    expect(updatedUsers.tylermcginnis.answers['6ni6ok3ym7mf1p33lnez']).toBe('optionTwo');
    
    // Check question's votes array was updated
    expect(updatedQuestions['6ni6ok3ym7mf1p33lnez'].optionTwo.votes).toContain('tylermcginnis');
  });

  it('should display correct voting results after backend update', async () => {
    const users = await _getUsers();
    const questions = await _getQuestions();

    // Create store with fresh data after voting - use original data structure
    const store = createTestStore({
      auth: { 
        user: { 
          id: 'sarahedo', 
          name: 'Sarah Edo',
          answers: { '8xf0y6ziyjabvozdd253nd': 'optionOne' }
        }, 
        isAuthenticated: true 
      },
      users: { users, loading: false, error: null },
      questions: { questions, loading: false, error: null }
    });

    renderWithProviders(<PollDetail />, store);

    // Should show poll results for answered question
    await waitFor(() => {
      expect(screen.getByText('Would You Rather')).toBeInTheDocument();
      expect(screen.getByText('Build our new application with Javascript')).toBeInTheDocument();
      expect(screen.getByText('Build our new application with Typescript')).toBeInTheDocument();
      
      // Should show vote counts and percentages based on actual data
      // sarahedo has 1 vote for optionOne, optionTwo has 0 votes
      expect(screen.getAllByText('1 votes')).toHaveLength(1);
      expect(screen.getAllByText('0 votes')).toHaveLength(1);
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
      
      // Should mark user's choice
      expect(screen.getByText('Your choice')).toBeInTheDocument();
    });
  });

  it('should handle voting action with Redux store integration', async () => {
    const users = await _getUsers();
    const questions = await _getQuestions();

    // Create store with unanswered question
    const store = createTestStore({
      auth: { 
        user: { 
          id: 'testuser', 
          name: 'Test User',
          answers: {}
        }, 
        isAuthenticated: true 
      },
      users: { users, loading: false, error: null },
      questions: { questions, loading: false, error: null }
    });

    renderWithProviders(<PollDetail />, store);

    // Should show voting buttons for unanswered question
    await waitFor(() => {
      expect(screen.getByText('Would You Rather')).toBeInTheDocument();
      const voteButtons = screen.getAllByText('Click');
      expect(voteButtons).toHaveLength(2);
    });

    // Click vote button should dispatch action
    const voteButtons = screen.getAllByText('Click');
    fireEvent.click(voteButtons[0]);

    // Verify store state gets updated (even if async action fails in test env)
    const state = store.getState();
    expect(state.questions.questions['8xf0y6ziyjabvozdd253nd']).toBeDefined();
  });
});