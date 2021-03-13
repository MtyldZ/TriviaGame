import {Question, UserScore} from '../../@types/types';

export interface TriviaGameState {
    allQuestions: Question[],
    allScores: UserScore[],
    chosenDifficulty: string,
    chosenCategory: string,
    totalTimeSpent: number,
    currentQuestionIndex: number,
    currentTotalPoint: number,
    earnedPointFromLastQuestion: number,
    fiftyPercentJokerIsUsed: boolean,
}
