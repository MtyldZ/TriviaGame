export type UserScore = {
    category: string;
    difficulty: string;
    score: number;
    totalTimeSpent: number;
}

export type HighScoreRowPartType = {
    score: string;
    difficulty: string;
    category: string;
    totalSpentTime: string;
}

export type Question = {
    index: number;
    difficulty: string;
    questionText: string;
    correctAnswer: string;
    wrongAnswers: string[];
}


