import {GestureResponderEvent} from 'react-native';

export type UserScore = {
    category: string;
    difficulty: string;
    score: number;
    totalTimeSpent: number;
}

export type Choice = {
    choiceName: string;
    choiceText: string;
    onPress?: (event: GestureResponderEvent) => void;
}

export type HighScoreRowPartType = {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
}

export type Question = {
    index: number;
    difficulty: string;
    questionText: string;
    correctAnswer: string;
    wrongAnswers: string[];
}

// this should not be here :)
export const DefaultQuestion: Question = {
    index: 99,
    difficulty: 'easy',
    questionText: 'This is the default question. What is 2+2?',
    correctAnswer: '4',
    wrongAnswers: ['1', '2', '3'],
};
