import {Question} from './types';

export const DefaultQuestion: Question = {
    index: 99,
    difficulty: 'easy',
    questionText: 'This is the default question. What is 2+2?',
    correctAnswer: '4',
    wrongAnswers: ['1', '2', '3'],
};
