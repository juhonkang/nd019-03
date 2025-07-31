import React from 'react';
import { useSelector } from 'react-redux';

const Leaderboard = () => {
  const { users } = useSelector((state) => state.users);

  const getUserStats = () => {
    return Object.values(users).map(user => {
      const answered = Object.keys(user.answers).length;
      const created = user.questions.length;
      const total = answered + created;
      
      return {
        ...user,
        answered,
        created,
        total
      };
    }).sort((a, b) => b.total - a.total);
  };

  const userStats = getUserStats();

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      
      <div className="leaderboard-table">
        <div className="table-header">
          <div className="header-cell">Users</div>
          <div className="header-cell">Answered</div>
          <div className="header-cell">Created</div>
        </div>
        
        {userStats.map((user, index) => (
          <div key={user.id} className="table-row">
            <div className="user-cell">
              <div className="user-avatar">👤</div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-id">{user.id}</div>
              </div>
            </div>
            <div className="stat-cell">{user.answered}</div>
            <div className="stat-cell">{user.created}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;