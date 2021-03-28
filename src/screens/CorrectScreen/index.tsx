import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {incrementQuestionIndexAction, resetTriviaGameAction, setHighScoresAction} from '../../store/triviaGame/action';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {Alert, BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {UserScore} from '../../utils/types';

export const CorrectScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [waiting, setWaiting] = useState(true);
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const earnedPoint = useSelector(state => state.triviaGame.lastEarnedPointAmount);
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const category = useSelector(state => state.triviaGame.chosenCategory);
    const difficulty = useSelector(state => state.triviaGame.chosenDifficulty);
    const timeSpent = useSelector(state => state.triviaGame.totalTimeSpent);
    const allScores = useSelector(state => state.triviaGame.highScores);

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

    const onButtonPress = useCallback(() => {
        setWaiting(false);
        // pop the correct Screen from stack
        navigation.dispatch(StackActions.pop(1));
        if (questionIndex === 9) {
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
        setWaiting(true);
    }, [allScores, category, difficulty, dispatch, navigation, questionIndex, timeSpent, totalPoint]);

    return (
        <>
            <HeaderComponent color={Colors.correctHeader}/>
            <View style={Styles.container}>
                <Image source={require('../../assets/icons/correct.png')} style={Styles.imageStyle}/>
                <Text style={Styles.biggerText}>{'Correct'}</Text>
                <View style={Styles.middleViewContainer}>
                    <Text style={Styles.smallerText}>
                        {'You have earned %%% points.'.replace(/%%%/g, earnedPoint.toString())}
                    </Text>
                    <Text style={Styles.smallerText}>
                        {'Total points %%%.'.replace(/%%%/g, totalPoint.toString())}
                    </Text>
                </View>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={() => onButtonPress()}
                                  disabled={!waiting}>
                    <Text style={Styles.smallerText}>{'Next Question'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
