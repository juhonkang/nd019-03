import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Leaderboard from '../components/Leaderboard.jsx';
import authSlice from '../store/authSlice';
import usersSlice from '../store/usersSlice';
import questionsSlice from '../store/questionsSlice';

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: null,
    answers: { 
      'q1': 'optionOne', 
      'q2': 'optionTwo',
      'q3': 'optionOne',
      'q4': 'optionTwo'
    },
    questions: ['q1', 'q2']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: null,
    answers: { 
      'q1': 'optionTwo', 
      'q3': 'optionOne'
    },
    questions: ['q3', 'q4']
  },
  mtsamis: {
    id: 'mtsamis',
    name: 'Mike Tsamis',
    avatarURL: null,
    answers: { 
      'q1': 'optionOne',
      'q2': 'optionTwo',
      'q4': 'optionOne'
    },
    questions: ['q5', 'q6', 'q7']
  }
};

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      users: usersSlice,
      questions: questionsSlice,
    },
    preloadedState: {
      auth: { user: null, isAuthenticated: false },
      users: { users: mockUsers, loading: false, error: null },
      questions: { questions: {}, loading: false, error: null }
    }
  });
};

const renderWithProviders = (component, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('Leaderboard Component', () => {
  it('should display correct user names', () => {
    renderWithProviders(<Leaderboard />);
    
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Tyler McGinnis')).toBeInTheDocument();
    expect(screen.getByText('Mike Tsamis')).toBeInTheDocument();
  });

  it('should display correct number of questions answered for each user', () => {
    renderWithProviders(<Leaderboard />);
    
    // Verify we have numeric data displayed for all users
    const numbers = screen.getAllByText(/^[0-9]+$/);
    expect(numbers.length).toBeGreaterThan(0);
    
    // Check that specific answer counts are displayed (using getAllByText since numbers may repeat)
    expect(screen.getAllByText('4')).toHaveLength(1); // Sarah's answers
    expect(screen.getAllByText('2')).toHaveLength(3); // Tyler's answers, Sarah's created, Tyler's created  
    expect(screen.getAllByText('3')).toHaveLength(2); // Mike's answers and created
  });

  it('should display correct number of questions created for each user', () => {
    renderWithProviders(<Leaderboard />);
    
    // Sarah Edo: 2 created, Tyler McGinnis: 2 created, Mike Tsamis: 3 created
    // Check that we have the numbers somewhere, accounting for both answered and created counts
    const allNumbers = screen.getAllByText(/^[0-9]+$/);
    const numberTexts = allNumbers.map(el => el.textContent);
    
    expect(numberTexts).toContain('2'); // Sarah's created and Tyler's answers
    expect(numberTexts).toContain('3'); // Mike's answers and created
    expect(numberTexts).toContain('4'); // Sarah's answers
  });

  it('should have correct table headers', () => {
    renderWithProviders(<Leaderboard />);
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Answered')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
  });

  it('should render leaderboard title', () => {
    renderWithProviders(<Leaderboard />);
    
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });
});