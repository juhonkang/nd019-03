import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navigation from '../components/Navigation.jsx';
import authSlice from '../store/authSlice';
import usersSlice from '../store/usersSlice';
import questionsSlice from '../store/questionsSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      users: usersSlice,
      questions: questionsSlice,
    },
    preloadedState: {
      auth: { 
        user: { 
          id: 'testuser', 
          name: 'Test User'
        }, 
        isAuthenticated: true 
      },
      users: { users: {}, loading: false, error: null },
      questions: { questions: {}, loading: false, error: null }
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

describe('Navigation Component', () => {
  it('should display all expected navigation links', () => {
    renderWithProviders(<Navigation />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should display current user name', () => {
    renderWithProviders(<Navigation />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should have working navigation links', () => {
    renderWithProviders(<Navigation />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const leaderboardLink = screen.getByText('Leaderboard').closest('a');
    const newLink = screen.getByText('New').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(leaderboardLink).toHaveAttribute('href', '/leaderboard');
    expect(newLink).toHaveAttribute('href', '/add');
  });
});