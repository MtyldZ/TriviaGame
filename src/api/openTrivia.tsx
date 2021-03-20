import {Question} from '../@types/types';

export async function fetchData(categoryNumber: number, difficulty: string) {
    let categoryUrlPart = (categoryNumber >= 9) ? `&category=${categoryNumber}` : '';
    let difficultyUrlPart = (difficulty.toLowerCase() !== 'any difficulty') ? `&difficulty=${difficulty.toLowerCase()}` : '';
    const url = `https://opentdb.com/api.php?amount=10${categoryUrlPart}${difficultyUrlPart}&type=multiple`;

    return fetch(url).then(r => r.json()).then(
        json => {
            const allQuestions: Question[] = [];
            for (let i = 0; i < 10; i++) {
                let result = json.results[i];
                let questionData = {
                    index: i,
                    difficulty: (difficultyUrlPart === '' ? result.difficulty : difficulty),
                    questionText: result.question,
                    correct_answer: result.correct_answer,
                    wrong_answers: [...result.incorrect_answers],
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


