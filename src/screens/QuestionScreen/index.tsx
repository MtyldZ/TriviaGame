import React, {memo, useCallback, useEffect, useState} from 'react';
import {Alert, BackHandler, SafeAreaView, View} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {incrementTotalPointAction, incrementTotalTimeSpentAction} from '../../store/triviaGame/action';
import {HeaderComponent} from '../../components/HeaderComponent';
import {Choice, ChoiceComponent} from '../../components/ChoiceComponent';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {shuffle} from '../../utils/shuffle';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {QuestionTextPartComponent} from '../../components/QuestionTextComponent';
import {calculateEarnedPoint} from '../../utils/calculate-earned-point';
import {StateEnum} from '../../utils/state-enum';

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

export const QuestionScreen = memo(function QuestionScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const questionObject = useSelector(
        state => state.triviaGame.questionList[state.triviaGame.questionIndex]);

    const [timeLeft, setTimeLeft] = useState(TIME_GIVEN_TO_SOLVE_SECONDS);
    const [gameState, setGameState] = useState(StateEnum.reading);

    const [choiceList, setChoiceList] = useState(
        createChoiceList(shuffle([...questionObject.wrongAnswers,
            questionObject.correctAnswer])));

    const answeredCorrectly = useCallback(() => {
        dispatch(incrementTotalPointAction(calculateEarnedPoint(timeLeft,
            questionObject.difficulty)));
        dispatch(incrementTotalTimeSpentAction(15 - timeLeft));
        navigation.dispatch(StackActions.replace('Correct'));
    }, [dispatch, navigation, questionObject.difficulty, timeLeft]);

    const answeredIncorrectly = useCallback(() => {
        navigation.dispatch(StackActions.replace('Wrong'));
    }, [navigation]);

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
    }, [answeredCorrectly, answeredIncorrectly, gameState, questionObject.correctAnswer]);

    const onJokerPress = useCallback((choicesThoseWillStayEnabled: string[]) => {
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
            navigation.dispatch(StackActions.replace('Timeout'));
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft(prevState => prevState - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [gameState, navigation, timeLeft]);

    const hardwareBackPressEventHandler = useCallback(() => {
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
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    return (
        <SafeAreaView style={Styles.container}>
            <HeaderComponent color={Colors.questionHeader}
                             parts={[
                                 {firstLine: 'Points', secondLine: totalPoint.toString()},
                                 {firstLine: 'Remaining Time', secondLine: timeLeft.toString()},
                             ]}/>
            <View style={Styles.bodyPartContainer}>
                <View style={Styles.jokerContainer}>
                    <FiftyPercentJokerComponent onPress={onJokerPress}/>
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
