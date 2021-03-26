import {Question} from '../@types/types';

export async function fetchData(categoryNumber: number, difficulty: string) {
    let categoryUrlPart = (categoryNumber >= 9) ? `&category=${categoryNumber}` : '';
    let difficultyUrlPart = (difficulty.toLowerCase() !== 'any difficulty') ? `&difficulty=${difficulty.toLowerCase()}` : '';
    const url = `https://opentdb.com/api.php?amount=10${categoryUrlPart}${difficultyUrlPart}&type=multiple`;

    return fetch(url).then(r => r.json()).then(
        json => {
            const allQuestions: Question[] = [];
            for (let i = 0; i < 10; i++) {
                const result = json.results[i];
                const questionData: Question = {
                    index: i,
                    difficulty: (difficultyUrlPart === '' ? result.difficulty : difficulty),
                    questionText: result.question,
                    correctAnswer: result.correct_answer,
                    wrongAnswers: [...result.incorrect_answers],
                };
                allQuestions.push(questionData);
            }
            return allQuestions;
        },
    ).catch(error => {
        console.error(error);
        throw error;
    });
}


