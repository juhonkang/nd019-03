import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { saveQuestionAnswer } from '../store/questionsSlice';
import { updateUserAnswer } from '../store/usersSlice';

const PollDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { questions } = useSelector((state) => state.questions);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  
  const question = questions[id];
  const author = question ? users[question.author] : null;
  const hasAnswered = user?.answers?.[id];

  useEffect(() => {
    if (!question) {
      navigate('/404');
    }
  }, [question, navigate]);

  const handleVote = async (option) => {
    try {
      await dispatch(saveQuestionAnswer({
        authedUser: user.id,
        qid: id,
        answer: option
      })).unwrap();
      
      dispatch(updateUserAnswer({
        userId: user.id,
        questionId: id,
        answer: option
      }));
      
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  if (!question || !author) {
    return <div className="loading">Loading...</div>;
  }

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage = totalVotes > 0 ? Math.round((question.optionOne.votes.length / totalVotes) * 100) : 0;
  const optionTwoPercentage = totalVotes > 0 ? Math.round((question.optionTwo.votes.length / totalVotes) * 100) : 0;

  return (
    <div className="poll-detail-container">
      <h2>Poll by {author.name}</h2>
      
      <div className="poll-avatar">
        <div className="avatar-placeholder">👤</div>
      </div>
      
      <h3>Would You Rather</h3>
      
      <div className="poll-options">
        <div className={`poll-option ${hasAnswered === 'optionOne' ? 'selected' : ''}`}>
          <div className="option-text">{question.optionOne.text}</div>
          
          {hasAnswered ? (
            <div className="option-results">
              <div className="vote-count">{question.optionOne.votes.length} votes</div>
              <div className="vote-percentage">{optionOnePercentage}%</div>
              {hasAnswered === 'optionOne' && <div className="your-choice">Your choice</div>}
            </div>
          ) : (
            <button 
              className="vote-btn"
              onClick={() => handleVote('optionOne')}
            >
              Click
            </button>
          )}
        </div>
        
        <div className={`poll-option ${hasAnswered === 'optionTwo' ? 'selected' : ''}`}>
          <div className="option-text">{question.optionTwo.text}</div>
          
          {hasAnswered ? (
            <div className="option-results">
              <div className="vote-count">{question.optionTwo.votes.length} votes</div>
              <div className="vote-percentage">{optionTwoPercentage}%</div>
              {hasAnswered === 'optionTwo' && <div className="your-choice">Your choice</div>}
            </div>
          ) : (
            <button 
              className="vote-btn"
              onClick={() => handleVote('optionTwo')}
            >
              Click
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollDetail;