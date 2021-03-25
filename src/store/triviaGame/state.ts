import {Question, UserScore} from '../../@types/types';

export interface TriviaGameState {
    questions: Question[];
    highScores: UserScore[];
    chosenDifficulty: string;
    chosenCategory: string;
    totalTimeSpent: number;
    questionIndex: number;
    totalPoint: number;
    lastEarnedPointAmount: number;
    fiftyPercentJokerIsUsed: boolean;
}
