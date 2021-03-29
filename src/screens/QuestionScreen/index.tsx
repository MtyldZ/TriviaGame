import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, BackHandler, SafeAreaView, View} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
    incrementTotalPointAction,
    incrementTotalTimeSpentAction,
    resetTriviaGameAction,
} from '../../store/triviaGame/action';
import {Question} from '../../utils/types';
import {HeaderComponent} from '../../components/HeaderComponent';
import {Choice, ChoiceComponent} from '../../components/ChoiceComponent';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {randomizer} from '../../utils/randomizer';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {QuestionTextPartComponent} from '../../components/QuestionTextComponent';
import {calculateEarnedPoint} from '../../utils/calculate-earned-point';
import {DefaultQuestion} from '../../utils/constants';

const optionNames = ['A', 'B', 'C', 'D'];

const createChoiceList = (allAnswersArray: string[]) => {
    return allAnswersArray.map((value, index) => (
        {
            choiceName: optionNames[index],
            choiceText: value,
            disabled: false,
        }
    ));
};

const waiting = 0;
const trueAnswered = 1;
const wrongAnswered = -1;
const TIME_GIVEN_TO_SOLVE = 15;

export const QuestionScreen = memo(() => {
    const dispatch = useDispatch();
    const totalPoints = useSelector(state => state.triviaGame.totalPoint);
    const navigation = useNavigation();
    const [timeLeft, setTimeLeft] = useState(TIME_GIVEN_TO_SOLVE);
    const [gameState, setGameState] = useState(waiting);
    const questionObject: Question = useSelector(state =>
        state.triviaGame.questions[state.triviaGame.questionIndex]) || DefaultQuestion;

    const randomizedChoiceList = useMemo(() => {
        return createChoiceList(randomizer([...questionObject.wrongAnswers, questionObject.correctAnswer]));
    }, [questionObject]);

    const [choiceList, setChoiceList] = useState(randomizedChoiceList);

    const answeredCorrectly = useCallback(() => {
        setGameState(trueAnswered);
        dispatch(incrementTotalPointAction(calculateEarnedPoint(timeLeft,
            questionObject.difficulty)));
        dispatch(incrementTotalTimeSpentAction(15 - timeLeft));
        navigation.navigate('Correct');
    }, [dispatch, navigation, questionObject.difficulty, timeLeft]);

    const answeredIncorrectly = useCallback(() => {
        setGameState(wrongAnswered);
        navigation.navigate('Wrong');
    }, [navigation]);

    const onChoicePress = useCallback((chosenChoice: Choice) => {
        // disable all choices
        setChoiceList(choiceList.map((value) => (
            {
                ...value,
                disabled: true,
            }
        )));

        if (chosenChoice.choiceText === questionObject.correctAnswer) {
            answeredCorrectly();
        } else {
            answeredIncorrectly();
        }
    }, [answeredCorrectly, answeredIncorrectly, choiceList, questionObject.correctAnswer]);

    const onJokerPressed = useCallback((choicesThoseWillStayEnabled: string[]) => {
        const newList = choiceList.map((value) => (
            {
                ...value,
                disabled: choicesThoseWillStayEnabled.indexOf(value.choiceText) === -1,
            }
        ));
        setChoiceList(newList);
    }, [choiceList]);

    useEffect(() => {
        if (gameState !== waiting) {
            return;
        }
        if (timeLeft === 0) {
            navigation.navigate('Timeout');
        }
        setTimeout(() => {
            setTimeLeft(prevState => prevState - 1);
        }, 1000);
    }, [gameState, navigation, timeLeft]);

    const hardwareBackPressEventHandler = useCallback(() => {
        Alert.alert('Caution!', 'Are you sure you want give up?', [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Give Up',
                style: 'default',
                onPress: () => {
                    navigation.dispatch(StackActions.replace('Start'));
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

    return (
        <SafeAreaView style={Styles.container}>
            <HeaderComponent color={Colors.questionHeader}
                             parts={[
                                 {first: 'Points', second: totalPoints.toString()},
                                 {first: 'Remaining Time', second: timeLeft.toString()},
                             ]}/>
            <View style={Styles.bodyPartContainer}>
                <View style={Styles.jokerContainer}>
                    <FiftyPercentJokerComponent onPress={onJokerPressed}/>
                </View>
                <QuestionTextPartComponent questionObject={questionObject}/>
                {
                    choiceList.map((choice, index) =>
                        <ChoiceComponent choiceName={choice.choiceName}
                                         choiceText={choice.choiceText}
                                         disabled={choice.disabled}
                                         onPress={() => onChoicePress(choice)}
                                         key={`key_${index}`}
                        />)
                }
            </View>
        </SafeAreaView>
    );
});
