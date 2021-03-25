import React, {memo} from 'react';
import {HighScoreRowComponent} from '../../components/HighScoreRowComponent';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {resetHighScoresAction, setHighScoresAction} from '../../store/triviaGame/action';
import {UserScore} from '../../@types/types';
import {useNavigation} from '@react-navigation/native';

// this function fills high score array
// used long press of ResetHighScores button
function temp() {
    const tempArr = [];
    for (let i = 0; i < 10; i++) {
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

const HighScoreRowGenerator = memo((props: { userScore: UserScore }) => {
        return <HighScoreRowComponent text1={props.userScore.score.toString()}
                                      text2={props.userScore.difficulty}
                                      text3={props.userScore.category}
                                      text4={props.userScore.totalTimeSpent.toString()}
        />;
    },
);

export const HighScoresScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const allScores = useSelector(state => state.triviaGame.highScores);
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={Styles.headerAndScoreContainer}>
                <View style={Styles.headerContainer}>
                    <Text style={Styles.headerText}>HIGH SCORES</Text>
                </View>
                <HighScoreRowComponent text1={'Score'}
                                       text2={'Difficulty'}
                                       text3={'Category'}
                                       text4={'Time Spent'}/>
                {
                    allScores.map((value, index) => {
                        return <HighScoreRowGenerator userScore={value} key={`part${index}`}/>;
                    })
                }
            </ScrollView>
            <View style={Styles.buttonsContainer}>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={() => navigation.navigate('Start')}
                >
                    <Text style={Styles.buttonText}>MAIN MENU</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={() => dispatch(resetHighScoresAction())}
                                  onLongPress={() => dispatch(setHighScoresAction(temp()))}
                >
                    <Text style={Styles.buttonText}>Reset Scores</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
});

