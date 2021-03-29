import {Question} from '../utils/types';

export async function fetchData(categoryNumber: number, difficulty: string) {
    const categoryUrlPart = (categoryNumber >= 9) ? `&category=${categoryNumber}` : '';
    const difficultyUrlPart = (difficulty.toLowerCase() !== 'any difficulty') ?
        `&difficulty=${difficulty.toLowerCase()}` : '';
    const url = `https://opentdb.com/api.php?amount=10${categoryUrlPart}${difficultyUrlPart}&type=multiple&encode=url3986`;

    return fetch(url).then(r => r.json()).then(
        json => {
            if (json.response_code === 1) {
                return Promise.reject();
            }
            const allQuestions: Question[] = [];
            for (let i = 0; i < json.results.length; i++) {
                const result = json.results[i];
                const questionData: Question = {
                    index: i,
                    difficulty: (difficultyUrlPart === '' ? unescape(result.difficulty) : difficulty),
                    questionText: unescape(result.question),
                    correctAnswer: unescape(result.correct_answer),
                    wrongAnswers: [...(result.incorrect_answers.map((value: string) =>
                        unescape(value)))],
                };
                allQuestions.push(questionData);
            }
            return allQuestions;
        },
    ).catch(error => {
        throw error;
    });
}


