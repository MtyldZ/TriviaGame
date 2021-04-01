import {Question, SelectorListType, UserScore} from '../../utils/types';

export interface TriviaGameState {
    categories: SelectorListType[];
    difficulties: SelectorListType[];
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
