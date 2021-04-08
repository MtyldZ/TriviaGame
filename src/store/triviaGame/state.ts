import {Question, SelectorListType, UserScore} from '../../utils/types';
import {ICategory} from '../../api/trivia-game-fetcher';

export interface TriviaGameState {
    categoryList: SelectorListType<ICategory>[];
    difficultyList: SelectorListType<ICategory>[];
    questionList: Question[];
    highScoreList: UserScore[];
    chosenDifficulty: string;
    chosenCategory: string;
    totalTimeSpent: number;
    questionIndex: number;
    totalPoint: number;
    isJokerUsed: boolean;
}
