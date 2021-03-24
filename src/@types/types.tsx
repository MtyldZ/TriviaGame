export type UserScore = {
    category: string,
    difficulty: string,
    score: number,
    totalTimeSpent: number
}

export function userSoreToUserScoreSTR(userScore: UserScore) {
    const temp: UserScoreSTR = {
        category: userScore.category,
        difficulty: userScore.difficulty,
        score: userScore.score + '',
        totalTimeSpent: userScore.totalTimeSpent + '',
    };
    return temp;
}

export type UserScoreSTR = {
    category: string,
    difficulty: string,
    score: string,
    totalTimeSpent: string
}

export type Question = {
    index: number;
    difficulty: string;
    questionText: string;
    correct_answer: string;
    wrong_answers: string[];
}
