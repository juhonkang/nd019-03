import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../store/questionsSlice';

const Home = () => {
  const [showAnswered, setShowAnswered] = useState(false);
  const dispatch = useDispatch();
  const { questions, loading } = useSelector((state) => state.questions);
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const getAnsweredQuestions = () => {
    return Object.values(questions)
      .filter(question => user?.answers?.[question.id])
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const getUnansweredQuestions = () => {
    return Object.values(questions)
      .filter(question => !user?.answers?.[question.id])
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const QuestionCard = ({ question }) => (
    <div className="question-card">
      <div className="question-author">{users[question.author]?.name}</div>
      <div className="question-timestamp">{formatTimestamp(question.timestamp)}</div>
      <Link to={`/questions/${question.id}`} className="show-btn">
        Show
      </Link>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const answeredQuestions = getAnsweredQuestions();
  const unansweredQuestions = getUnansweredQuestions();

  return (
    <div className="home-container">
      <div className="toggle-section">
        <button 
          className={`toggle-btn ${!showAnswered ? 'active' : ''}`}
          onClick={() => setShowAnswered(false)}
        >
          New Questions
        </button>
        <button 
          className={`toggle-btn ${showAnswered ? 'active' : ''}`}
          onClick={() => setShowAnswered(true)}
        >
          Done
        </button>
      </div>

      <div className="questions-section">
        <h2>{showAnswered ? 'Done' : 'New Questions'}</h2>
        <div className="questions-grid">
          {(showAnswered ? answeredQuestions : unansweredQuestions).map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;