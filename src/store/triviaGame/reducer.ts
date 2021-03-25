import {createReducer} from 'deox';
import {TriviaGameState} from './state';
import {
    incrementQuestionIndexAction,
    incrementTotalPointAction,
    incrementTotalTimeSpentAction,
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
                currentQuestionIndex: state.questionIndex + (state.questionIndex === 10 ? 0 : 1),
            };
        }),
        handle(incrementTotalPointAction, (state, action) => {
            return {
                ...state,
                currentTotalPoint: state.totalPoint + action.payload.morePoints,
                earnedPointFromLastQuestion: action.payload.morePoints,
            };
        }),
        handle(setQuestionsAction, (state, action) => {
            return {
                ...state, questions: action.payload.questions,
            };
        }),
        handle(setHighScoresAction, (state, action) => {
            return {
                ...state, allScores: [...action.payload.scoreArray],
            };
        }),
        handle(resetHighScoresAction, (state) => {
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
                questions: [],
                currentTotalPoint: 0,
                currentQuestionIndex: 0,
                earnedPointFromLastQuestion: 0,
                fiftyPercentJokerIsUsed: false,
                chosenCategory: 'Any Category',
                chosenDifficulty: 'Any Difficulty',
                totalTimeSpent: 0,
            };
        }),
        handle(incrementTotalTimeSpentAction, (state, action) => {
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
