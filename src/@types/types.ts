import {ImageSourcePropType} from 'react-native';

export type UserScore = {
    category: string;
    difficulty: string;
    score: number;
    totalTimeSpent: number;
}

export type Question = {
    index: number;
    difficulty: string;
    questionText: string;
    correctAnswer: string;
    wrongAnswers: string[];
}

export const DefaultQuestion: Question = {
    index: 99,
    difficulty: 'easy',
    questionText: 'This is the default question. What is 2+2?',
    correctAnswer: '4',
    wrongAnswers: ['1', '2', '3'],
};

export type ResultScreenObjectType = {
    colorBody: string;
    colorButton: string;
    icon: ImageSourcePropType;
    firstText: string;
    secondText: string;
    thirdText: string;
    buttonText: string;
}
