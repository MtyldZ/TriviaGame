import React, {memo, useCallback} from 'react';
import {HighScoreRowComponent} from '../../components/HighScoreRowComponent';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {resetHighScoreListAction} from '../../store/triviaGame/action';
import {ScreenPropType} from '../../utils/types';
import {useNavigation} from '@react-navigation/native';

export const HighScoresScreen = memo<ScreenPropType>(function HighScoresScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const allScores = useSelector(state => state.triviaGame.highScoreList);

    const onMainMenuPressed = useCallback(() => {
        navigation.navigate('Start');
    }, [navigation]);

    const onResetScoresPressed = useCallback(() => {
        dispatch(resetHighScoreListAction());
    }, [dispatch]);

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={Styles.headerAndScoreContainer}>
                <View style={Styles.headerContainer}>
                    <Text style={Styles.headerText}>HIGH SCORES</Text>
                </View>
                <HighScoreRowComponent score='Score'
                                       difficulty='Difficulty'
                                       category='Category'
                                       totalSpentTime='Time Spent'/>
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
                                  onPress={onMainMenuPressed}>
                    <Text style={Styles.buttonText}>MAIN MENU</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={onResetScoresPressed}>
                    <Text style={Styles.buttonText}>Reset Scores</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
});


