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
    correct_answer: string;
    wrong_answers: string[];
}

export type ResultScreenObjectType = {
    colorBody: string;
    colorButton: string;
    icon: ImageSourcePropType;
    firstText: string;
    secondText: string;
    thirdText: string;
    buttonText: string;
}
