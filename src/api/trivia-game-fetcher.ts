import {Question} from '../utils/types';

export function getQuestionListByIdAndDifficultFromAPI(categoryNumber: number, difficulty: string) {
    const QUESTION_AMOUNT = 10;
    // 0 is the id of Any Category
    const categoryUrlPart = (categoryNumber !== 0) ? `&category=${categoryNumber}` : '';
    const difficultyUrlPart = (difficulty.toLowerCase() !== 'any difficulty') ?
        `&difficulty=${difficulty.toLowerCase()}` : '';
    const url = `https://opentdb.com/api.php?amount=${QUESTION_AMOUNT}${categoryUrlPart}` +
        `${difficultyUrlPart}&type=multiple&encode=url3986`;

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


export interface ICategory {
    id: number;
    name: string;
}

interface ICategoryList {
    trivia_categories: ICategory[]
}


export function getCategoryListFromAPI(): Promise<ICategory[]> {
    const urlCategory = 'https://opentdb.com/api_category.php';
    return fetch(urlCategory)
        .then<ICategoryList>(r => r.json())
        .then(json => {
                const anyCategory: ICategory = {
                    id: 0,
                    name: 'Any Category',
                    //todo
                };
                return [anyCategory, ...json.trivia_categories];

                // return json.trivia_categories;
            },
        ).catch(error => {
            console.log(error);
            throw error;
        });

}
