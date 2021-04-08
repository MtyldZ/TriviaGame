import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {
    incrementQuestionIndexAction,
    resetTriviaGameAction,
    setHighScoreListAction,
} from '../../store/triviaGame/action';
import {StackActions, useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {Alert, BackHandler, View} from 'react-native';
import {Styles} from './style';
import {ScreenPropType, UserScore} from '../../utils/types';
import {StateEnum} from '../../utils/state-enum';
import {ResultBodyComponent} from '../../components/ResultBodyComponent';
import {ButtonComponent} from '../../components/ButtonComponent';

export const CorrectScreen = memo<ScreenPropType>(function CorrectScreen({navigation, route}) {
    const {earnedPoint, totalPoint, questionIndex} = route.params;

    const dispatch = useDispatch();
    const questionListLength = useSelector(state => state.triviaGame.questionList.length);
    const category = useSelector(state => state.triviaGame.chosenCategory);
    const difficulty = useSelector(state => state.triviaGame.chosenDifficulty);
    const timeSpent = useSelector(state => state.triviaGame.totalTimeSpent);
    const allScores = useSelector(state => state.triviaGame.highScoreList);
    const [screenState, setScreenState] = useState(StateEnum.reading);

    const hardwareBackPressed = useCallback(() => {
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

    const onButtonPressed = useCallback(() => {
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
            dispatch(setHighScoreListAction(tempArr));
            navigation.dispatch(StackActions.replace('Victory'));
        } else {
            dispatch(incrementQuestionIndexAction());
            navigation.dispatch(StackActions.replace('Question'));
        }
    }, [allScores, category, difficulty, dispatch, navigation, questionIndex, questionListLength, screenState, timeSpent, totalPoint]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressed);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressed);
    }, [hardwareBackPressed]));

    return (
        <>
            <HeaderComponent color={Colors.correctHeader}/>
            <View style={Styles.container}>
                <ResultBodyComponent
                    image={require('../../assets/icons/correct.png')}
                    title='Correct'
                    otherTexts={[
                        `You have earned ${earnedPoint.toString()} points.`,
                        `Total points ${totalPoint.toString()}.`,
                    ]}/>
                <ButtonComponent
                    onPress={onButtonPressed}
                    buttonText='Next Question'
                    color={Colors.correctButton}
                    isDisabled={screenState !== StateEnum.reading}/>
            </View>
        </>
    );
});
