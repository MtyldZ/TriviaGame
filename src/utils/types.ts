import {NavigationProp} from '@react-navigation/core/lib/typescript/src/types';
import {ParamListBase} from '@react-navigation/routers';

export type UserScore = {
    category: string;
    difficulty: string;
    score: number;
    totalTimeSpent: number;
}

export type HighScoreRowPartType = {
    score: string;
    difficulty: string;
    category: string;
    totalSpentTime: string;
}

export type Question = {
    index: number;
    difficulty: string;
    questionText: string;
    correctAnswer: string;
    wrongAnswers: string[];
}

export type SelectorListType<T = undefined> = {
    id: number;
    name: string;
    item?: T;
}

export type ScreenPropType<T = undefined> = {
    navigation?: NavigationProp<ParamListBase>;
    route: {
        key: string;
        name: string;
        params: ParamType<T>;
    }
}

export type ParamType<T> = {
    earnedPoint?: number;
    totalPoint?: number;
    questionIndex?: number;
    item?: T;
}
