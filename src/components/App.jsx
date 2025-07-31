import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/usersSlice';
import { fetchQuestions } from '../store/questionsSlice';
import Navigation from './Navigation.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import PollDetail from './PollDetail.jsx';
import NewPoll from './NewPoll.jsx';
import Leaderboard from './Leaderboard.jsx';
import NotFound from './NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navigation />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/questions/:id" element={
              <ProtectedRoute>
                <PollDetail />
              </ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute>
                <NewPoll />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
