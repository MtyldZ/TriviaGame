export type UserScore = {
    category: string;
    difficulty: string;
    score: number;
    totalTimeSpent: number;
}

export type HighScoreRowPartType = {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
}

export type Question = {
    index: number;
    difficulty: string;
    questionText: string;
    correctAnswer: string;
    wrongAnswers: string[];
}


