import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Styles} from './style';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {incCurrentTotalPointAction, incTotalTimeSpentAction} from '../../store/triviagame/action';
import {calculateEarnedPoint} from '../../utils/calculateEarnedPoint';
import {Question} from '../../@types/types';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {ChoiceComponent} from '../../components/ChoiceComponent';
import {textReplace} from '../../utils/rePlaceText';
import {randomizer} from '../../utils/randomizer';

const optionNames = ['A', 'B', 'C', 'D'];

const QuestionTextPart = (props: { questionObject: Question }) => {
    const lineNumberNeededNormally = Math.ceil(props.questionObject.questionText.length / 25);
    const neededHeight = 175 * (lineNumberNeededNormally > 4 ? 4 : lineNumberNeededNormally) / 4;

    return (
        <View style={[Styles.questionContainer, {height: neededHeight}]}>
            <Text style={Styles.questionTextStyle} numberOfLines={4} adjustsFontSizeToFit={true}>
                {textReplace(props.questionObject.questionText)}
            </Text>
        </View>
    );
};

export function QuestionScreen() {
    const dispatch = useDispatch();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const allQuestions: Question[] = useSelector(state => state.triviagame.allQuestions);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    const questionObject: Question = allQuestions[questionIndex];

    const navigation = useSwitchNavigation();
    const [count, setCount] = useState(15);
    const [allChoices, setAllChoices] = useState([...questionObject.wrong_answers, questionObject.correct_answer]);
    const choices = useMemo(() => randomizer(allChoices), [allChoices]);

    useEffect(() => {
        const intervalToDecrease = setInterval(() => setCount(prev => (prev > 0 ? prev - 1 : 0)), 1000);

        if (count === 0) {
            navigation.navigate('Timeout');
        }
        return () => clearInterval(intervalToDecrease);
    }, [count, navigation]);

    const choicePressHandler = (value: string) => {
        if (questionObject.correct_answer === value) {
            dispatch(incCurrentTotalPointAction(calculateEarnedPoint(count, questionObject.difficulty)));
            dispatch(incTotalTimeSpentAction(15 - count));
            navigation.navigate('Correct');
        } else {
            navigation.navigate('Wrong');
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <DefaultHeaderComponent theme={defaultThemes.question}
                                    parts={[
                                        {first: 'Points', second: totalPoints + ''},
                                        {first: 'Remaining Time', second: count + ''},
                                    ]}/>
            <View style={Styles.bodyPartContainer}>
                <View style={Styles.FiftyPercentJokerContainer}>
                    <FiftyPercentJokerComponent onPress={(strings) => setAllChoices(strings)}/>
                </View>
                <QuestionTextPart questionObject={questionObject}/>
                {choices.map((value, index) =>
                    <ChoiceComponent onPress={() => choicePressHandler(value.toString())}
                                     choiceName={optionNames[index]}
                                     choiceText={textReplace(value.toString())}
                                     key={`part${index}`}
                    />)}
            </View>
        </SafeAreaView>
    );
}
