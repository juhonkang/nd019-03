import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveQuestion } from '../store/questionsSlice';
import { addUserQuestion } from '../store/usersSlice';

const NewPoll = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!optionOneText.trim() || !optionTwoText.trim()) {
      alert('Please fill in both options');
      return;
    }
    
    setLoading(true);
    
    try {
      const newQuestion = await dispatch(saveQuestion({
        optionOneText: optionOneText.trim(),
        optionTwoText: optionTwoText.trim(),
        author: user.id
      })).unwrap();
      
      dispatch(addUserQuestion({
        userId: user.id,
        questionId: newQuestion.id
      }));
      
      navigate('/');
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error creating question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-poll-container">
      <h2>Would You Rather</h2>
      <h3>Create Your Own Poll</h3>
      
      <form onSubmit={handleSubmit} className="new-poll-form">
        <div className="form-group">
          <label htmlFor="optionOne">First Option</label>
          <input
            type="text"
            id="optionOne"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            placeholder="Option One"
            className="form-control"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="optionTwo">Second Option</label>
          <input
            type="text"
            id="optionTwo"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            placeholder="Option Two"
            className="form-control"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading || !optionOneText.trim() || !optionTwoText.trim()}
        >
          {loading ? 'Creating...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default NewPoll;