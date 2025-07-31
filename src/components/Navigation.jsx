import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navigation">
      <div className="nav-links">
        <Link to="/" className={isActive('/')}>
          Home
        </Link>
        <Link to="/leaderboard" className={isActive('/leaderboard')}>
          Leaderboard
        </Link>
        <Link to="/add" className={isActive('/add')}>
          New
        </Link>
      </div>
      
      <div className="nav-user">
        <div className="user-info">
          <span className="user-avatar">👤</span>
          <span className="user-name">{user?.name}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;