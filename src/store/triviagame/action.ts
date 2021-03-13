import {createAction} from 'deox';
import {Question, UserScore} from '../../@types/types';

export const incCurrentQuestionIndexAction = createAction('INCREMENT_CURRENT_QUESTION_INDEX');

export const setCurrentTotalPointAction = createAction(
    'SET_CURRENT_TOTAL_POINT',
    resolve => (newCurrentTotalPoint: number) => resolve({newCurrentTotalPoint}),
);

export const incCurrentTotalPointAction = createAction(
    'INCREMENT_CURRENT_TOTAL_POINT',
    resolve => (morePoints: number) => resolve({morePoints}),
);

export const setEarnedPointFromLastQuestion = createAction(
    'SET_EARNED_POINT_FROM_LAST_QUESTION',
    resolve => (newEarnedPointFromLastQuestion: number) => resolve({newEarnedPointFromLastQuestion}),
);

export const resetTriviaGameAction = createAction(
    'RESET_TRIVIA_GAME_ACTION',
    resolve => () => resolve({}),
);

export const setAllQuestionsAction = createAction(
    'SET_ALL_QUESTIONS',
    resolve => (allQuestions: Question[]) => resolve({allQuestions}),
);

export const setAllScoresAction = createAction(
    'SET_ALL_SCORES',
    resolve => (scoreArray: UserScore[]) => resolve({scoreArray}),
);

export const addToAllScoresAction = createAction(
    'ADD_TO_ALL_SCORES',
    resolve => (score: UserScore) => resolve({score}),
);

export const resetAllScoresAction = createAction('ADD_TO_ALL_SCORES');

export const useFiftyPercentJokerAction = createAction('USE_FIFTY_PERCENT_JOKER_ACTION');

export const incTotalTimeSpentAction = createAction(
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

