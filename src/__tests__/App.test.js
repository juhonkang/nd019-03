import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../components/App.jsx';
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
      auth: { user: null, isAuthenticated: false },
      users: { users: {}, loading: false, error: null },
      questions: { questions: {}, loading: false, error: null }
    }
  });
};

describe('App Component', () => {
  it('should render without crashing', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('should match snapshot', () => {
    const store = createMockStore();
    
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
});