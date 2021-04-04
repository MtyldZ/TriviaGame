import {createAction} from 'deox';
import {Question, SelectorListType, UserScore} from '../../utils/types';


export const setCategoryListAction = createAction('SET_CATEGORIES_ACTION',
    resolve => (categoryList: SelectorListType[]) => resolve({categoryList}));
export const incrementQuestionIndexAction = createAction('INCREMENT_QUESTION_INDEX');
export const spendFiftyPercentJokerRightAction = createAction('SPEND_FIFTY_PERCENT_JOKER_RIGHT_ACTION');
export const refreshFiftyPercentJokerRightAction = createAction('REFRESH_FIFTY_PERCENT_JOKER_RIGHT');
export const resetTriviaGameAction = createAction('RESET_TRIVIA_GAME');
export const resetHighScoreListAction = createAction('RESET_HIGH_SCORES');
export const incrementTotalPointAction = createAction(
    'INCREMENT_TOTAL_POINT',
    resolve => (earnedPoint: number) => resolve({earnedPoint}),
);
export const setQuestionListAction = createAction(
    'SET_QUESTIONS',
    resolve => (questionList: Question[]) => resolve({questionList}),
);
export const setHighScoreListAction = createAction(
    'SET_HIGH_SCORES',
    resolve => (scoreList: UserScore[]) => resolve({scoreList}),
);
export const incrementTotalTimeSpentAction = createAction(
    'INCREMENT_TOTAL_TIME_SPENT_POINT',
    resolve => (spentTime: number) => resolve({spentTime}),
);
export const setChosenCategoryAction = createAction(
    'SET_CHOSEN_CATEGORY_ACTION',
    resolve => (newCategory: string) => resolve({newCategory}),
);
export const setChosenDifficultyAction = createAction(
    'SET_CHOSEN_DIFFICULTY_ACTION',
    resolve => (newDifficulty: string) => resolve({newDifficulty}),
);

