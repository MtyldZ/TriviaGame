import {createReducer} from 'deox';
import {TriviaGameState} from './state';
import {
    incCurrentQuestionIndexAction,
    incCurrentTotalPointAction,
    incTotalTimeSpentAction,
    resetAllScoresAction,
    resetTriviaGameAction,
    setAllQuestionsAction,
    setAllScoresAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setCurrentTotalPointAction,
    setEarnedPointFromLastQuestion,
    spendFiftyPercentJokerRightAction,
} from './action';


const initialState: TriviaGameState = {
    currentQuestionIndex: 0,
    currentTotalPoint: 0,
    earnedPointFromLastQuestion: 0,
    allQuestions: [],
    allScores: [],
    fiftyPercentJokerIsUsed: false,
    chosenCategory: 'Any Category',
    chosenDifficulty: 'Any Difficulty',
    totalTimeSpent: 0,
};

export const triviaGameReducer = createReducer(
    initialState, handle => [
        handle(incCurrentQuestionIndexAction, state => {
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + (state.currentQuestionIndex === 10 ? 0 : 1),
            };
        }),
        handle(incCurrentTotalPointAction, (state, action) => {
            return {
                ...state,
                currentTotalPoint: state.currentTotalPoint + action.payload.morePoints,
                earnedPointFromLastQuestion: action.payload.morePoints,
            };
        }),
        handle(setCurrentTotalPointAction, (state, action) => {
            return {
                ...state, currentTotalPoint: action.payload.newCurrentTotalPoint,
            };
        }),
        handle(setEarnedPointFromLastQuestion, (state, action) => {
            return {
                ...state, earnedPointFromLastQuestion: action.payload.newEarnedPointFromLastQuestion,
            };
        }),
        handle(setAllQuestionsAction, (state, action) => {
            return {
                ...state, allQuestions: action.payload.allQuestions,
            };
        }),
        handle(setAllScoresAction, (state, action) => {
            return {
                ...state, allScores: [...action.payload.scoreArray],
            };
        }),
        handle(resetAllScoresAction, (state) => {
            return {
                ...state, allScores: [],
            };
        }),
        handle(spendFiftyPercentJokerRightAction, (state) => {
            return {
                ...state, fiftyPercentJokerIsUsed: true,
            };
        }),

        handle(resetTriviaGameAction, state => {
            return {
                ...state,
                allQuestions: [],
                currentTotalPoint: 0,
                currentQuestionIndex: 0,
                earnedPointFromLastQuestion: 0,
                fiftyPercentJokerIsUsed: false,
                chosenCategory: 'Any Category',
                chosenDifficulty: 'Any Difficulty',
                totalTimeSpent: 0,
            };
        }),
        handle(incTotalTimeSpentAction, (state, action) => {
            return {
                ...state, totalTimeSpent: state.totalTimeSpent + action.payload.spentTime,
            };
        }),
        handle(setChosenCategoryAction, (state, action) => {
            return {
                ...state, chosenCategory: action.payload.newCategory,
            };
        }),
        handle(setChosenDifficultyAction, (state, action) => {
            return {
                ...state, chosenDifficulty: action.payload.newDifficulty,
            };
        }),

    ],
);
