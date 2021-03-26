import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction, setHighScoresAction} from '../../store/triviaGame/action';
import {UserScore} from '../../@types/types';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {Styles} from '../TimeOutScreen/style';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export const VictoryScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const category = useSelector(state => state.triviaGame.chosenCategory);
    const difficulty = useSelector(state => state.triviaGame.chosenDifficulty);
    const timeSpent = useSelector(state => state.triviaGame.totalTimeSpent);
    const allScores = useSelector(state => state.triviaGame.highScores);

    const pressHandler = useCallback(() => {
        const score: UserScore = {
            totalTimeSpent: timeSpent,
            category: category,
            difficulty: difficulty,
            score: totalPoint,
        };
        const tempArr = [...allScores, score].sort((a, b) => (
            b.score - a.score));

        dispatch(setHighScoresAction(tempArr));
        navigation.navigate('Start');
        dispatch(resetTriviaGameAction());
    }, [allScores, category, difficulty, dispatch, navigation, timeSpent, totalPoint]);

    return (
        <>
            <HeaderComponent color={Colors.victoryHeader}/>
            <View style={Styles.container}>
                <Image source={require('../../assets/icons/victory.png')} style={Styles.imageStyle}/>
                <Text style={Styles.biggerText}>{'Victory'}</Text>
                <View style={Styles.middleViewContainer}>
                    <Text style={Styles.smallerText}>
                        {'You answered correctly to all Questions'}
                    </Text>
                    <Text style={Styles.smallerText}>
                        {'You won with %%% points.'.replace(/%%%/g, totalPoint.toString())}
                    </Text>
                </View>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={pressHandler}>
                    <Text style={Styles.smallerText}>{'Main Menu'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
