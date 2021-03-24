import React from 'react';
import {LeaderBoardRow} from '../../components/LeaderBoardRow';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {resetAllScoresAction, setAllScoresAction} from '../../store/triviagame/action';
import {UserScore, UserScoreSTR, userSoreToUserScoreSTR} from '../../@types/types';
import {StackActions, useNavigation} from '@react-navigation/native';

export function LeaderBoardScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const allScores = useSelector(state => state.triviagame.allScores);
    const firstRow: UserScoreSTR = {
        category: 'Score',
        difficulty: 'Difficulty',
        score: 'Category',
        totalTimeSpent: 'Time Spent',
    };

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={Styles.headerAndScoreContainer}>
                <View style={Styles.headerContainer}>
                    <Text style={Styles.headerText}>HIGH SCORES</Text>
                </View>
                <LeaderBoardRow userScore={firstRow}/>
                {
                    allScores.map((value, index) =>
                        <LeaderBoardRow userScore={userSoreToUserScoreSTR(value)} key={`part${index}`}/>,
                    )
                }
            </ScrollView>
            <View style={Styles.buttonsContainer}>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={() => navigation.dispatch(StackActions.popToTop())}
                >
                    <Text style={Styles.buttonText}>MAIN MENU</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={() => dispatch(resetAllScoresAction())}
                                  onLongPress={() => dispatch(setAllScoresAction(temp()))}
                >
                    <Text style={Styles.buttonText}>Reset Scores</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// this function fills high score array
function temp() {
    let score: UserScore = {
        totalTimeSpent: 120,
        category: 'Any Category',
        difficulty: 'Any Difficulty',
        score: Math.round(8000 * Math.random()),
    };
    const tempArr = [score];

    for (let i = 0; i < 10; i++) {
        tempArr.push(score);
    }
    tempArr.sort((a, b) => (b.score - a.score));
    return tempArr;
}
