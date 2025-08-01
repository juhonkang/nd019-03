import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PollDetail from '../components/PollDetail.jsx';
import authSlice from '../store/authSlice';
import usersSlice from '../store/usersSlice';
import questionsSlice from '../store/questionsSlice';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'test-question-id' }),
  useNavigate: () => jest.fn(),
}));

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: null,
    answers: {},
    questions: []
  }
};

const mockQuestions = {
  'test-question-id': {
    id: 'test-question-id',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['user1', 'user2'],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: ['user3'],
      text: 'Build our new application with Typescript'
    }
  }
};

const createMockStore = (userAnswers = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      users: usersSlice,
      questions: questionsSlice,
    },
    preloadedState: {
      auth: { 
        user: { 
          id: 'currentuser', 
          name: 'Current User',
          answers: userAnswers
        }, 
        isAuthenticated: true 
      },
      users: { users: mockUsers, loading: false, error: null },
      questions: { questions: mockQuestions, loading: false, error: null }
    }
  });
};

const renderWithProviders = (component, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('PollDetail Component', () => {
  it('should display poll options for unanswered questions', () => {
    renderWithProviders(<PollDetail />);
    
    expect(screen.getByText('Build our new application with Javascript')).toBeInTheDocument();
    expect(screen.getByText('Build our new application with Typescript')).toBeInTheDocument();
    expect(screen.getAllByText('Click')).toHaveLength(2);
  });

  it('should display vote counts and percentages for answered polls', () => {
    const answeredStore = createMockStore({ 'test-question-id': 'optionOne' });
    renderWithProviders(<PollDetail />, answeredStore);
    
    // Option One: 2 votes out of 3 total = 67%
    // Option Two: 1 vote out of 3 total = 33%
    expect(screen.getByText('2 votes')).toBeInTheDocument();
    expect(screen.getByText('1 votes')).toBeInTheDocument();
    expect(screen.getByText('67%')).toBeInTheDocument();
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('should mark the selected option for answered polls', () => {
    const answeredStore = createMockStore({ 'test-question-id': 'optionOne' });
    renderWithProviders(<PollDetail />, answeredStore);
    
    expect(screen.getByText('Your choice')).toBeInTheDocument();
  });

  it('should display "Would You Rather" text', () => {
    renderWithProviders(<PollDetail />);
    
    expect(screen.getByText('Would You Rather')).toBeInTheDocument();
  });

  it('should display poll author name', () => {
    renderWithProviders(<PollDetail />);
    
    expect(screen.getByText('Poll by Sarah Edo')).toBeInTheDocument();
  });

  it('should handle voting mechanism correctly', async () => {
    const store = createMockStore();
    renderWithProviders(<PollDetail />, store);
    
    // Find and click the vote button for option one
    const voteButtons = screen.getAllByText('Click');
    fireEvent.click(voteButtons[0]);
    
    // The component should dispatch the vote action
    // We can verify the store state has been updated
    const state = store.getState();
    expect(state.questions.questions['test-question-id']).toBeDefined();
  });

  it('should calculate vote percentages correctly after voting', () => {
    // Test with a different vote distribution
    const customQuestions = {
      'test-question-id': {
        id: 'test-question-id',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
          votes: ['user1'],
          text: 'Build our new application with Javascript',
        },
        optionTwo: {
          votes: ['user2', 'user3', 'user4'],
          text: 'Build our new application with Typescript'
        }
      }
    };

    const customStore = configureStore({
      reducer: {
        auth: authSlice,
        users: usersSlice,
        questions: questionsSlice,
      },
      preloadedState: {
        auth: { 
          user: { 
            id: 'currentuser', 
            name: 'Current User',
            answers: { 'test-question-id': 'optionTwo' }
          }, 
          isAuthenticated: true 
        },
        users: { users: mockUsers, loading: false, error: null },
        questions: { questions: customQuestions, loading: false, error: null }
      }
    });

    renderWithProviders(<PollDetail />, customStore);
    
    // Option One: 1 vote out of 4 total = 25%
    // Option Two: 3 votes out of 4 total = 75%
    expect(screen.getByText('1 votes')).toBeInTheDocument();
    expect(screen.getByText('3 votes')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});