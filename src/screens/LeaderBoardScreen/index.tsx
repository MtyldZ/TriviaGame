import React from 'react';
import {LeaderBoardRow, LeaderBoardRowPart} from '../../components/LeaderBoardRow';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {resetAllScoresAction, setAllScoresAction} from '../../store/triviagame/action';
import {UserScore} from '../../@types/types';

export function LeaderBoardScreen(): React.ReactElement {
    const allScores = useSelector(state => state.triviagame.allScores);
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();

    return (
        <>
            <SafeAreaView style={Styles.view}>
                <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            style={Styles.view_view}>
                    <View style={Styles.view_view_header}>
                        <Text style={Styles.view_view_header_text}>
                            HIGH SCORES
                        </Text>
                    </View>
                    <View style={Styles.view_view_view}>
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
                <TouchableOpacity style={Styles.view_touchableOpacity}
                                  onPress={() => navigation.navigate('Start')}
                >
                    <Text style={Styles.view_touchableOpacity_text}>MAIN MENU</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.view_touchableOpacity}
                                  onPress={() => dispatch(resetAllScoresAction())}
                                  onLongPress={() => dispatch(setAllScoresAction(temp()))}
                >
                    <Text style={Styles.view_touchableOpacity_text}>Reset Scores</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

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
