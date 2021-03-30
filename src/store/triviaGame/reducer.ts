import {createReducer} from 'deox';
import {TriviaGameState} from './state';
import {
    incrementQuestionIndexAction,
    incrementTotalPointAction,
    incrementTotalTimeSpentAction,
    refreshFiftyPercentJokerRightAction,
    resetHighScoresAction,
    resetTriviaGameAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setHighScoresAction,
    setQuestionsAction,
    spendFiftyPercentJokerRightAction,
} from './action';

const initialState: TriviaGameState = {
    questionIndex: 0,
    totalPoint: 0,
    lastEarnedPointAmount: 0,
    questions: [],
    highScores: [],
    fiftyPercentJokerIsUsed: false,
    chosenCategory: 'Any Category',
    chosenDifficulty: 'Any Difficulty',
    totalTimeSpent: 0,
};

export const triviaGameReducer = createReducer(
    initialState, handle => [
        handle(incrementQuestionIndexAction, state => {
            return {
                ...state,
                questionIndex: state.questionIndex + (state.questionIndex === 10 ? 0 : 1),
            };
        }),
        handle(incrementTotalPointAction, (state, action) => {
            return {
                ...state,
                totalPoint: state.totalPoint + action.payload.morePoints,
                lastEarnedPointAmount: action.payload.morePoints,
            };
        }),
        handle(setQuestionsAction, (state, action) => {
            return {
                ...state, questions: action.payload.questions,
            };
        }),
        handle(setHighScoresAction, (state, action) => {
            return {
                ...state,
                highScores: [...action.payload.scoreArray],
            };
        }),
        handle(resetHighScoresAction, (state) => {
            return {
                ...state,
                highScores: [],
            };
        }),
        handle(spendFiftyPercentJokerRightAction, (state) => {
            return {
                ...state,
                fiftyPercentJokerIsUsed: true,
            };
        }),
        handle(refreshFiftyPercentJokerRightAction, (state) => {
            return {
                ...state,
                fiftyPercentJokerIsUsed: false,
            };
        }),
        handle(resetTriviaGameAction, state => {
            return {
                ...initialState,
                highScores: state.highScores,
            };
        }),
        handle(incrementTotalTimeSpentAction, (state, action) => {
            return {
                ...state,
                totalTimeSpent: state.totalTimeSpent + action.payload.spentTime,
            };
        }),
        handle(setChosenCategoryAction, (state, action) => {
            return {
                ...state,
                chosenCategory: action.payload.newCategory,
            };
        }),
        handle(setChosenDifficultyAction, (state, action) => {
            return {
                ...state,
                chosenDifficulty: action.payload.newDifficulty,
            };
        }),
    ],
);
