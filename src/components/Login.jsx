import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuthenticatedUser } from '../store/authSlice';
import { fetchUsers } from '../store/usersSlice';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { users, loading } = useSelector((state) => state.users);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!userId || !password) {
      setError('Please select a user and enter password');
      return;
    }
    
    const user = users[userId];
    if (!user || user.password !== password) {
      setError('Invalid credentials');
      return;
    }
    
    dispatch(setAuthenticatedUser(user));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Employee Polls</h1>
        <div className="user-avatars">
          <img src="/LoginImages.png" alt="Employee Avatars" className="login-avatars-image" />
        </div>
        <h2>Log In</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="user">User</label>
          <select 
            id="user"
            value={userId} 
            onChange={(e) => setUserId(e.target.value)}
            className="form-control"
          >
            <option value="">Select a user</option>
            {Object.values(users).map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;