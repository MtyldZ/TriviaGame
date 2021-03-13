import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Header} from '../../components/Header/Header';
import {BodyResultScreen} from '../../components/Body/BodyResultScreen';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {addToAllScoresAction, resetTriviaGameAction, setAllScoresAction} from '../../store/triviagame/action';
import {UserScore} from '../../@types/types';

export function VictoryScreen(): ReactElement {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    const category = useSelector(state => state.triviagame.chosenCategory);
    const difficulty = useSelector(state => state.triviagame.chosenDifficulty);
    const timeSpent = useSelector(state => state.triviagame.totalTimeSpent);
    const allScores = useSelector(state => state.triviagame.allScores);


    return (
        <SafeAreaView style={Styles.container}>
            <Header moreStyle={[Styles.moreHeader]}
                    parts={[{text: 'Question', text2: (questionIndex) + '/10', text2style: []}]}
            />
            <BodyResultScreen moreStyle={Styles.body}
                              moreStyleForIcon={{}}
                              iconSource={require('../../icons/correct.png')}
                              text1={'Victory'}
                              text2={`You won with ${totalPoints} points.`}
                              text3={`You answered correctly to all Questions`}
                              buttonText={'Play Again ?'}
                              moreStyleForButton={[Styles.Choice]}
                              onButtonPress={() => {
                                  let score: UserScore = {
                                      totalTimeSpent: timeSpent,
                                      category: category,
                                      difficulty: difficulty,
                                      score: totalPoints,
                                  };
                                  const tempArr = [...allScores, score]
                                      .sort((a, b) => (b.score - a.score));

                                  dispatch(setAllScoresAction(tempArr));

                                  navigation.navigate('Start');
                                  dispatch(resetTriviaGameAction());
                              }}
            />
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#ff166f',
    },
    body: {
        backgroundColor: '#ff166f',
    },
    moreHeader: {
        backgroundColor: '#8d133f',
    },
    Choice: {
        backgroundColor: '#8d133f',
    },
});
