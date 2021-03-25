import React, {memo, useEffect, useMemo, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {incrementTotalPointAction, incrementTotalTimeSpentAction} from '../../store/triviaGame/action';
import {calculateEarnedPoint} from '../../utils/calculate-earned-point';
import {Question} from '../../@types/types';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {HeaderComponent} from '../../components/HeaderComponent';
import {ChoiceComponent} from '../../components/ChoiceComponent';
import {textReplace} from '../../utils/replace-text';
import {randomizer} from '../../utils/randomizer';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';

const optionNames = ['A', 'B', 'C', 'D'];

const QuestionTextPart = memo((props: { questionObject: Question }) => {
    const lineNumberNeededNormally = Math.ceil(props.questionObject.questionText.length / 25);
    const neededHeight = 175 * (lineNumberNeededNormally > 4 ? 4 : lineNumberNeededNormally) / 4;

    return (
        <View style={[Styles.questionContainer, {height: neededHeight}]}>
            <Text style={Styles.questionTextStyle} numberOfLines={4} adjustsFontSizeToFit={true}>
                {textReplace(props.questionObject.questionText)}
            </Text>
        </View>
    );
});

export const QuestionScreen = memo(() => {
    const dispatch = useDispatch();
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const allQuestions: Question[] = useSelector(state => state.triviaGame.questions);
    const totalPoints = useSelector(state => state.triviaGame.totalPoint);
    const questionObject: Question = allQuestions[questionIndex];
    const navigation = useNavigation();
    const [count, setCount] = useState(15);
    const [allChoices, setAllChoices] = useState([...questionObject.wrong_answers, questionObject.correct_answer]);
    const choices = useMemo(() => randomizer(allChoices), [allChoices]);

    const choicePressHandler = (value: string) => {
        if (questionObject.correct_answer === value) {
            dispatch(incrementTotalPointAction(calculateEarnedPoint(count, questionObject.difficulty)));
            dispatch(incrementTotalTimeSpentAction(15 - count));
            navigation.dispatch(StackActions.replace('Correct'));
        } else {
            navigation.dispatch(StackActions.replace('Wrong'));
        }
    };

    useEffect(() => {
        const intervalToDecrease = setInterval(() => setCount(prev => (prev > 0 ? prev - 1 : 0)), 1000);
        if (count === 0) {
            navigation.dispatch(StackActions.replace('Timeout'));
        }
        return () => {
            clearInterval(intervalToDecrease);
        };
    }, [count, navigation]);

    return (
        <SafeAreaView style={Styles.container}>
            <HeaderComponent color={Colors.questionHeader}
                             parts={[
                                        {first: 'Points', second: totalPoints.toString()},
                                        {first: 'Remaining Time', second: count.toString()},
                                    ]}/>
            <View style={Styles.bodyPartContainer}>
                <View style={Styles.jokerContainer}>
                    <FiftyPercentJokerComponent onPress={(strings) => setAllChoices(strings)}/>
                </View>
                <QuestionTextPart questionObject={questionObject}/>
                {
                    choices.map((value, index) =>
                        <ChoiceComponent choiceName={optionNames[index]}
                                         choiceText={textReplace(value.toString())}
                                         onPress={() => choicePressHandler(value.toString())}
                                         key={`part${index}`}
                        />)
                }
            </View>
        </SafeAreaView>
    );
});
