import {Question} from './types';

export const Categories = [
    'Any Category',
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals & Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations',
];

export const Difficulties = [
    'Any Difficulty',
    'Easy',
    'Medium',
    'Hard',
];

export const DefaultQuestion: Question = {
    index: 99,
    difficulty: 'easy',
    questionText: 'This is the default question. What is 2+2?',
    correctAnswer: '4',
    wrongAnswers: ['1', '2', '3'],
};
