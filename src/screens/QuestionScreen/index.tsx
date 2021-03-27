import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, BackHandler, SafeAreaView, Text, View} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
    incrementTotalPointAction,
    incrementTotalTimeSpentAction,
    resetTriviaGameAction,
} from '../../store/triviaGame/action';
import {calculateEarnedPoint} from '../../utils/calculate-earned-point';
import {Question} from '../../utils/types';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {HeaderComponent} from '../../components/HeaderComponent';
import {ChoiceComponent} from '../../components/ChoiceComponent';
import {textReplace} from '../../utils/replace-text';
import {randomizer} from '../../utils/randomizer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {DefaultQuestion} from '../../utils/defaultObjects';

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
    const totalPoints = useSelector(state => state.triviaGame.totalPoint);
    const navigation = useNavigation();
    const [count, setCount] = useState(15);
    const questionObject: Question = useSelector(state =>
        state.triviaGame.questions[state.triviaGame.questionIndex]) || DefaultQuestion;
    const [allChoices, setAllChoices] = useState([
        ...questionObject.wrongAnswers, questionObject.correctAnswer]);
    const choices = useMemo(() => randomizer(allChoices), [allChoices]);

    const choicePressHandler = (value: string) => {
        if (questionObject.correctAnswer === value) {
            dispatch(incrementTotalPointAction(calculateEarnedPoint(count, questionObject.difficulty)));
            dispatch(incrementTotalTimeSpentAction(15 - count));
            navigation.navigate('Correct');
        } else {
            navigation.navigate('Wrong');
        }
    };

    const hardwareBackPressEventHandler = useCallback(() => {
        Alert.alert('Caution!', 'Are you sure you want give up?', [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Give Up',
                style: 'default',
                onPress: () => {
                    navigation.navigate('Start');
                    dispatch(resetTriviaGameAction());
                },
            },
        ]);
        return true;
    }, [dispatch, navigation]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    useEffect(() => {
        const intervalToDecrease = setInterval(() => setCount(prev => (prev > 0 ? prev - 1 : 0)), 1000);
        if (count === 0) {
            navigation.navigate('Timeout');
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
