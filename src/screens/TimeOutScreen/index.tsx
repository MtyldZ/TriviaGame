import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {StateEnum} from '../../utils/state-enum';
import {UserScore} from '../../utils/types';
import {setHighScoresAction} from '../../store/triviaGame/action';

export const Timeout = memo(() => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const category = useSelector(state => state.triviaGame.chosenCategory);
    const difficulty = useSelector(state => state.triviaGame.chosenDifficulty);
    const allScores = useSelector(state => state.triviaGame.highScores);
    const timeSpent = useSelector(state => state.triviaGame.totalTimeSpent);
    const [screenState, setScreenState] = useState(StateEnum.reading);

    const buttonPressEventHandler = useCallback(() => {
        if (screenState !== StateEnum.reading) {
            return;
        }
        setScreenState(StateEnum.pressed);
        // if the player can solve more than 2 questions, record the score
        if (questionIndex > 2) {
            const score: UserScore = {
                totalTimeSpent: timeSpent,
                category: category,
                difficulty: difficulty,
                score: totalPoint,
            };
            const tempArr = [...allScores, score].sort((a, b) => (
                b.score - a.score));
            dispatch(setHighScoresAction(tempArr));
        }
        navigation.goBack();
    }, [allScores, category, difficulty, dispatch, navigation, questionIndex, screenState, timeSpent, totalPoint]);

    const hardwareBackPressEventHandler = useCallback(() => {
        buttonPressEventHandler();
        return true;
    }, [buttonPressEventHandler]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    return (
        <>
            <HeaderComponent color={Colors.timeOutHeader}/>
            <View style={Styles.container}>
                <Image source={require('../../assets/icons/timeout.png')} style={Styles.imageStyle}/>
                <Text style={Styles.biggerText}>{'Time Out'}</Text>
                <View style={Styles.middleViewContainer}>
                    <Text style={Styles.smallerText}>
                        {'You failed.'}
                    </Text>
                    <Text style={Styles.smallerText}>
                        {`Total points ${totalPoint.toString()}.`}
                    </Text>
                </View>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={buttonPressEventHandler}
                                  disabled={screenState !== StateEnum.reading}>
                    <Text style={Styles.smallerText}>{'Main Menu'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
