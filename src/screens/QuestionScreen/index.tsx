import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, BackHandler, SafeAreaView, View} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {incrementTotalPointAction, incrementTotalTimeSpentAction} from '../../store/triviaGame/action';
import {HeaderComponent} from '../../components/HeaderComponent';
import {Choice, ChoiceComponent} from '../../components/ChoiceComponent';
import {StackActions, useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {shuffle} from '../../utils/shuffle';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {QuestionTextPartComponent} from '../../components/QuestionTextComponent';
import {calculateEarnedPoint} from '../../utils/calculate-earned-point';
import {StateEnum} from '../../utils/state-enum';
import {ParamType, ScreenPropType} from '../../utils/types';

const OPTION_NAMES = ['A', 'B', 'C', 'D'];

const createChoiceList = (allAnswersArray: string[]) => {
    return allAnswersArray.map((value, index) => (
        {
            choiceName: OPTION_NAMES[index],
            choiceText: value,
            disabled: false,
        }
    ));
};

const TIME_GIVEN_TO_SOLVE_SECONDS = 15;

export const QuestionScreen = memo<ScreenPropType>(function QuestionScreen({navigation}) {
    const dispatch = useDispatch();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const questionObject = useSelector(
        state => state.triviaGame.questionList[state.triviaGame.questionIndex]);

    const [timeLeft, setTimeLeft] = useState(TIME_GIVEN_TO_SOLVE_SECONDS);
    const [gameState, setGameState] = useState(StateEnum.reading);
    const [choiceList, setChoiceList] = useState(
        createChoiceList(shuffle([...questionObject.wrongAnswers,
            questionObject.correctAnswer])));

    const earnedPoint = useMemo(() =>
            calculateEarnedPoint(timeLeft, questionObject.difficulty),
        [questionObject.difficulty, timeLeft]);

    const resultObject = useMemo(() => {
            const routeParams: ParamType<undefined> = {
                earnedPoint: earnedPoint,
                totalPoint: totalPoint + earnedPoint,
                questionIndex: questionIndex,
            };
            return routeParams;
        },
        [earnedPoint, questionIndex, totalPoint]);

    const answeredCorrectly = useCallback(() => {
        dispatch(incrementTotalPointAction(earnedPoint));
        dispatch(incrementTotalTimeSpentAction(TIME_GIVEN_TO_SOLVE_SECONDS - timeLeft));
        navigation.dispatch(StackActions.replace('Correct', {
            ...resultObject,
        }));
    }, [dispatch, earnedPoint, navigation, resultObject, timeLeft]);

    const answeredIncorrectly = useCallback(() => {
        navigation.dispatch(StackActions.replace('Wrong', {
            ...resultObject,
        }));
    }, [navigation, resultObject]);

    const onChoicePressed = useCallback((chosenChoice: Choice) => {
        if (gameState !== StateEnum.reading) {
            return;
        }
        setGameState(StateEnum.pressed);
        if (chosenChoice.choiceText === questionObject.correctAnswer) {
            setGameState(StateEnum.answeredCorrect);
            answeredCorrectly();
        } else {
            setGameState(StateEnum.answeredWrong);
            answeredIncorrectly();
        }
    }, [answeredCorrectly, answeredIncorrectly, gameState, questionObject]);

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
        if (gameState !== StateEnum.reading) {
            return;
        }
        if (timeLeft === 0) {
            navigation.dispatch(StackActions.replace('Timeout', {
                ...resultObject,
            }));
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft(prevState => prevState - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [gameState, navigation, questionIndex, resultObject, timeLeft, totalPoint]);

    const hardwareBackPressed = useCallback(() => {
        Alert.alert('Caution!', 'Are you sure you want give up?', [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Give Up',
                style: 'default',
                onPress: () => {
                    navigation.goBack();
                },
            },
        ]);
        return true;
    }, [navigation]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressed);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressed);
    }, [hardwareBackPressed]));

    return (
        <SafeAreaView style={Styles.container}>
            <HeaderComponent color={Colors.questionHeader}
                             parts={[
                                 {firstLine: 'Points', secondLine: totalPoint.toString()},
                                 {firstLine: 'Remaining Time', secondLine: timeLeft.toString()},
                             ]}/>
            <View style={Styles.bodyPartContainer}>
                <View style={Styles.jokerContainer}>
                    <FiftyPercentJokerComponent onPress={onJokerPressed}/>
                </View>
                <QuestionTextPartComponent questionObject={questionObject}/>
                {
                    choiceList.map((choice, index) =>
                        <ChoiceComponent choice={choice}
                                         onPress={() => onChoicePressed(choice)}
                                         key={`key_${index}`}/>)
                }
            </View>
        </SafeAreaView>
    );
});
