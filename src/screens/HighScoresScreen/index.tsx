import React, {memo, useCallback} from 'react';
import {HighScoreRowComponent} from '../../components/HighScoreRowComponent';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {resetHighScoreListAction, setHighScoreListAction} from '../../store/triviaGame/action';
import {UserScore} from '../../utils/types';
import {useNavigation} from '@react-navigation/native';

function generateMockHighScoreList() {
    const amountOfRandomScores = 10;
    const tempArr = [];
    for (let i = 0; i < amountOfRandomScores; i++) {
        const score: UserScore = {
            totalTimeSpent: Math.round(150 * Math.random()),
            category: 'Any Category',
            difficulty: 'Any Difficulty',
            score: Math.round(8000 * Math.random()),
        };
        tempArr.push(score);
    }
    tempArr.sort((a, b) => (b.score - a.score));
    return tempArr;
}

export const HighScoresScreen = memo(function HighScoresScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const allScores = useSelector(state => state.triviaGame.highScoreList);

    const onMainMenuPressHandler = useCallback(() => {
        navigation.navigate('Start');
    }, [navigation]);

    const onResetScoresPressHandler = useCallback(() => {
        dispatch(resetHighScoreListAction());
    }, [dispatch]);

    const onResetScoresLongPressHandler = useCallback(() => {
        dispatch(setHighScoreListAction(generateMockHighScoreList()));
    }, [dispatch]);

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={Styles.headerAndScoreContainer}>
                <View style={Styles.headerContainer}>
                    <Text style={Styles.headerText}>HIGH SCORES</Text>
                </View>
                {/*//prefer single quote*/}
                <HighScoreRowComponent score="Score"
                                       difficulty="Difficulty"
                                       category={'Category'}
                                       totalSpentTime={'Time Spent'}/>
                {
                    allScores.map((value, index) => {
                        return <HighScoreRowComponent score={value.score.toString()}
                                                      difficulty={value.difficulty}
                                                      category={value.category}
                                                      totalSpentTime={value.totalTimeSpent.toString()}
                                                      key={`key_${index}`}/>;
                    })
                }
            </ScrollView>
            <View style={Styles.buttonsContainer}>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={onMainMenuPressHandler}>
                    <Text style={Styles.buttonText}>MAIN MENU</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={onResetScoresPressHandler}
                                  onLongPress={onResetScoresLongPressHandler}>
                    <Text style={Styles.buttonText}>Reset Scores</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
});


