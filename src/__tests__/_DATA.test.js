import { _saveQuestion, _saveQuestionAnswer } from '../../_DATA.js';

describe('_DATA.js', () => {
  describe('_saveQuestion', () => {
    it('should return the saved question when correctly formatted data is passed', async () => {
      const question = {
        optionOneText: 'Test option one',
        optionTwoText: 'Test option two',
        author: 'sarahedo'
      };

      const result = await _saveQuestion(question);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('timestamp');
      expect(result.author).toBe('sarahedo');
      expect(result.optionOne.text).toBe('Test option one');
      expect(result.optionTwo.text).toBe('Test option two');
      expect(result.optionOne.votes).toEqual([]);
      expect(result.optionTwo.votes).toEqual([]);
    });

    it('should reject when incorrect data is passed - missing optionOneText', async () => {
      const question = {
        optionTwoText: 'Test option two',
        author: 'sarahedo'
      };

      await expect(_saveQuestion(question)).rejects.toBe('Please provide optionOneText, optionTwoText, and author');
    });

    it('should reject when incorrect data is passed - missing optionTwoText', async () => {
      const question = {
        optionOneText: 'Test option one',
        author: 'sarahedo'
      };

      await expect(_saveQuestion(question)).rejects.toBe('Please provide optionOneText, optionTwoText, and author');
    });

    it('should reject when incorrect data is passed - missing author', async () => {
      const question = {
        optionOneText: 'Test option one',
        optionTwoText: 'Test option two'
      };

      await expect(_saveQuestion(question)).rejects.toBe('Please provide optionOneText, optionTwoText, and author');
    });
  });

  describe('_saveQuestionAnswer', () => {
    it('should return true when correctly formatted data is passed', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne'
      };

      const result = await _saveQuestionAnswer(answerData);

      expect(result).toBe(true);
    });

    it('should reject when incorrect data is passed - missing authedUser', async () => {
      const answerData = {
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne'
      };

      await expect(_saveQuestionAnswer(answerData)).rejects.toBe('Please provide authedUser, qid, and answer');
    });

    it('should reject when incorrect data is passed - missing qid', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        answer: 'optionOne'
      };

      await expect(_saveQuestionAnswer(answerData)).rejects.toBe('Please provide authedUser, qid, and answer');
    });

    it('should reject when incorrect data is passed - missing answer', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd'
      };

      await expect(_saveQuestionAnswer(answerData)).rejects.toBe('Please provide authedUser, qid, and answer');
    });
  });
});