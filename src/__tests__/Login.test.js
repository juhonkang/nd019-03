import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../components/Login.jsx';
import authSlice from '../store/authSlice';
import usersSlice from '../store/usersSlice';
import questionsSlice from '../store/questionsSlice';

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: null,
    answers: {},
    questions: []
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    password: 'abc321',
    name: 'Tyler McGinnis',
    avatarURL: null,
    answers: {},
    questions: []
  }
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      users: usersSlice,
      questions: questionsSlice,
    },
    preloadedState: {
      auth: { user: null, isAuthenticated: false },
      users: { users: mockUsers, loading: false, error: null },
      questions: { questions: {}, loading: false, error: null },
      ...initialState
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

describe('Login Component', () => {
  it('should render user name field, password field, and submit button', async () => {
    renderWithProviders(<Login />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/user/i)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should show error when incorrect username or password is entered', async () => {
    renderWithProviders(<Login />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/user/i)).toBeInTheDocument();
    });
    
    const userSelect = screen.getByLabelText(/user/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(userSelect, { target: { value: 'sarahedo' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should show error when no user is selected', async () => {
    renderWithProviders(<Login />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/user/i)).toBeInTheDocument();
    });
    
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please select a user and enter password/i)).toBeInTheDocument();
    });
  });

  it('should render Employee Polls title', async () => {
    renderWithProviders(<Login />);
    
    await waitFor(() => {
      expect(screen.getByText('Employee Polls')).toBeInTheDocument();
    });
  });
});