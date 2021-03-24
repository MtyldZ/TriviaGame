import {ImageSourcePropType} from 'react-native';

export type themeType = {
    1: string;
    2: string;
    image: ImageSourcePropType;
    t1: string;
    t2: string;
    t3: string;
    t4: string;
}

export const defaultThemes = {
    correct: {
        1: '#00b354',
        2: '#006d35',
        image: require('../icons/correct.png'),
        t1: 'Correct',
        t2: 'You have earned %%% points.',
        t3: 'Total points %%%.',
        t4: 'Next Question',
    },
    wrong: {
        1: '#fd004a',
        2: '#a0002c',
        image: require('../icons/wrong.png'),
        t1: 'Wrong',
        t2: 'You failed.',
        t3: 'Total points %%%.',
        t4: 'Main Menu',
    },
    timeout: {
        1: '#fd004a',
        2: '#a0002c',
        image: require('../icons/timeout.png'),
        t1: 'Time Out',
        t2: 'You failed.',
        t3: 'Total points %%%.',
        t4: 'Main Menu',
    },
    victory: {
        1: '#ff166f',
        2: '#a00d42',
        image: require('../icons/victory.png'),
        t1: 'Victory',
        t2: 'You answered correctly to all Questions',
        t3: 'You won with %%% points.',
        t4: 'Next Question',
    },
    question: {
        1: '#7b00e9',
        2: '#4a008b',
        image: require('../icons/correct.png'),
        t1: '',
        t2: '',
        t3: '',
        t4: '',
    },
    start: {
        1: '#5300e6',
        2: '#2f008a',
    },
};
