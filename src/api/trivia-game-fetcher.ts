import {Question, SelectorListType} from '../utils/types';

export async function fetchData(categoryNumber: number, difficulty: string) {
    const QUESTION_AMOUNT = 10;

    const categoryUrlPart = (categoryNumber >= 9) ? `&category=${categoryNumber}` : '';
    const difficultyUrlPart = (difficulty.toLowerCase() !== 'any difficulty') ?
        `&difficulty=${difficulty.toLowerCase()}` : '';
    const url = `https://opentdb.com/api.php?amount=${QUESTION_AMOUNT}${categoryUrlPart}${difficultyUrlPart}&type=multiple&encode=url3986`;

    return fetch(url).then(r => r.json()).then(json => {
            if (json.response_code === 1) {
                return Promise.reject();
            }
            const allQuestions: Question[] = [];
            for (let i = 0; i < json.results.length; i++) {
                const result = json.results[i];
                const questionData: Question = {
                    index: i,
                    difficulty: (difficultyUrlPart === '' ? decodeURIComponent(result.difficulty) : difficulty),
                    questionText: decodeURIComponent(result.question),
                    correctAnswer: decodeURIComponent(result.correct_answer),
                    wrongAnswers: [...(result.incorrect_answers.map((value: string) =>
                        decodeURIComponent(value)))],
                };
                allQuestions.push(questionData);
            }
            return allQuestions;
        },
    ).catch(error => {
        throw error;
    });
}

export async function fetchCategory() {
    const urlCategory = 'https://opentdb.com/api_category.php';
    return fetch(urlCategory).then(r => r.json()).then(json => {
            const categoryList: SelectorListType[] = [
                {
                    id: 0,
                    name: 'Any Category',
                },
            ];
            for (let i = 0; i < json.trivia_categories.length; i++) {
                const data = json.trivia_categories[i];
                categoryList.push({
                    id: data.id,
                    name: data.name,
                });
            }
            return categoryList;
        },
    ).catch(error => {
        console.log(error);
        throw error;
    });

}
