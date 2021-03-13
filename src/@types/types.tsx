export type UserScore = {
    category: string,
    difficulty: string,
    score: number,
    totalTimeSpent: number
}

export type Question = {
    index: number;
    difficulty: string;
    questionText: string;
    correct_answer: string;
    wrong_answers: string[];
}
