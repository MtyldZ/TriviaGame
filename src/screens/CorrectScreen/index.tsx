import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {incrementQuestionIndexAction, resetTriviaGameAction, setHighScoresAction} from '../../store/triviaGame/action';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {Alert, BackHandler, View} from 'react-native';
import {Styles} from './style';
import {UserScore} from '../../utils/types';
import {StateEnum} from '../../utils/state-enum';
import {ResultBodyComponent} from '../../components/ResultBodyComponent';
import {DisableableButtonComponent} from '../../components/DisableableButtonComponent';

export const CorrectScreen = memo(function CorrectScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const questionListLength = useSelector(state => state.triviaGame.questions.length);
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const earnedPoint = useSelector(state => state.triviaGame.lastEarnedPointAmount);
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const category = useSelector(state => state.triviaGame.chosenCategory);
    const difficulty = useSelector(state => state.triviaGame.chosenDifficulty);
    const timeSpent = useSelector(state => state.triviaGame.totalTimeSpent);
    const allScores = useSelector(state => state.triviaGame.highScores);
    const [screenState, setScreenState] = useState(StateEnum.reading);

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

    const onButtonPress = useCallback(() => {
        if (screenState !== StateEnum.reading) {
            return;
        }
        setScreenState(StateEnum.pressed);
        if (questionIndex === questionListLength - 1) {
            const score: UserScore = {
                totalTimeSpent: timeSpent,
                category: category,
                difficulty: difficulty,
                score: totalPoint,
            };
            const tempArr = [...allScores, score].sort((a, b) => (
                b.score - a.score));
            dispatch(setHighScoresAction(tempArr));
            navigation.dispatch(StackActions.replace('Victory'));
        } else {
            dispatch(incrementQuestionIndexAction());
            navigation.dispatch(StackActions.replace('Question'));
        }
    }, [allScores, category, difficulty, dispatch, navigation, questionIndex, questionListLength, screenState, timeSpent, totalPoint]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    return (
        <>
            <HeaderComponent color={Colors.correctHeader}/>
            <View style={Styles.container}>
                <ResultBodyComponent
                    image={require('../../assets/icons/correct.png')}
                    textUnderImage={'Correct'}
                    lowerTexts={[
                        `You have earned ${earnedPoint.toString()} points.`,
                        `Total points ${totalPoint.toString()}.`,
                    ]}/>
                <DisableableButtonComponent
                    onPress={onButtonPress}
                    buttonText={'Next Question'}
                    color={Colors.correctButton}
                    isDisabled={screenState !== StateEnum.reading}/>
            </View>
        </>
    );
});
