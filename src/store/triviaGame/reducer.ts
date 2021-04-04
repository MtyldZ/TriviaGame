import {createReducer} from 'deox';
import {TriviaGameState} from './state';
import {
    incrementQuestionIndexAction,
    incrementTotalPointAction,
    incrementTotalTimeSpentAction,
    refreshFiftyPercentJokerRightAction,
    resetHighScoreListAction,
    resetTriviaGameAction,
    setCategoryListAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setHighScoreListAction,
    setQuestionListAction,
    spendFiftyPercentJokerRightAction,
} from './action';
import {DIFFICULTIES} from '../../utils/constants';

const initialState: TriviaGameState = {
    categoryList: [],
    difficultyList: DIFFICULTIES,
    questionIndex: 0,
    totalPoint: 0,
    lastEarnedPointAmount: 0,
    questionList: [],
    highScoreList: [],
    isJokerUsed: false,
    chosenCategory: 'Any Category',
    chosenDifficulty: 'Any Difficulty',
    totalTimeSpent: 0,
};

export const triviaGameReducer = createReducer(
    initialState, handle => [
        handle(setCategoryListAction, (state, action) => {
            return {
                ...state,
                categoryList: action.payload.categoryList,
            };
        }),
        handle(incrementQuestionIndexAction, state => {
            return {
                ...state,
                questionIndex: state.questionIndex + (state.questionIndex === 10 ? 0 : 1),
            };
        }),
        handle(incrementTotalPointAction, (state, action) => {
            return {
                ...state,
                totalPoint: state.totalPoint + action.payload.earnedPoint,
                lastEarnedPointAmount: action.payload.earnedPoint,
            };
        }),
        handle(setQuestionListAction, (state, action) => {
            return {
                ...state,
                questionList: action.payload.questionList,
            };
        }),
        handle(setHighScoreListAction, (state, action) => {
            return {
                ...state,
                highScoreList: [...action.payload.scoreList],
            };
        }),
        handle(resetHighScoreListAction, (state) => {
            return {
                ...state,
                highScoreList: [],
            };
        }),
        handle(spendFiftyPercentJokerRightAction, (state) => {
            return {
                ...state,
                isJokerUsed: true,
            };
        }),
        handle(refreshFiftyPercentJokerRightAction, (state) => {
            return {
                ...state,
                isJokerUsed: false,
            };
        }),
        handle(resetTriviaGameAction, state => {
            return {
                ...initialState,
                highScoreList: state.highScoreList,
                categoryList: state.categoryList,
                difficultyList: state.difficultyList,
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
