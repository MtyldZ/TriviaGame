import React from 'react';
import {LeaderBoardRow, LeaderBoardRowPart} from '../../components/LeaderBoardRow';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {resetAllScoresAction, setAllScoresAction} from '../../store/triviagame/action';
import {UserScore} from '../../@types/types';

export function LeaderBoardScreen() {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();
    const allScores = useSelector(state => state.triviagame.allScores);

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView showsVerticalScrollIndicator={true} style={Styles.headerAndScoreContainer}>
                <View style={Styles.headerContainer}>
                    <Text style={Styles.headerText}>HIGH SCORES</Text>
                </View>
                <View style={Styles.scoreDescriptionContainer}>
                    <LeaderBoardRowPart text={'Score'} size={15}/>
                    <LeaderBoardRowPart text={'Difficulty'} size={20}/>
                    <LeaderBoardRowPart text={'Category'} size={40}/>
                    <LeaderBoardRowPart text={'Time Spent'} size={25}/>
                </View>
                {
                    allScores.map((value, index) =>
                        <LeaderBoardRow userScore={value} key={`part${index}`}/>,
                    )
                }
            </ScrollView>
            <TouchableOpacity style={Styles.buttonContainer}
                              onPress={() => navigation.navigate('Start')}
            >
                <Text style={Styles.buttonContainerText}>MAIN MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.buttonContainer}
                              onPress={() => dispatch(resetAllScoresAction())}
                              onLongPress={() => dispatch(setAllScoresAction(temp()))}
            >
                <Text style={Styles.buttonContainerText}>Reset Scores</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// this function fills high score array
function temp() {
    let score: UserScore = {
        totalTimeSpent: 120,
        category: 'Any Category',
        difficulty: 'Any Difficulty',
        score: 5500,
    };
    const tempArr = [score];

    for (let i = 0; i < 10; i++) {
        tempArr.push(score);
    }

    tempArr.sort((a, b) => (b.score - a.score));

    return tempArr;
}
