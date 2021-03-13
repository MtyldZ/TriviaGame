import React, {memo} from 'react';
import {SafeAreaView} from 'react-native';
import {Header} from '../../components/Header/Header';
import {BodyResultScreen} from '../../components/Body/BodyResultScreen';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction, setAllScoresAction} from '../../store/triviagame/action';
import {UserScore} from '../../@types/types';
import {Styles} from './style';

export const VictoryScreen = memo(() => {
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
            <Header moreStyle={Styles.moreHeader}
                    parts={[{text: 'Question', text2: (questionIndex) + '/10', text2style: []}]}
            />
            <BodyResultScreen moreStyle={Styles.moreStyle}
                              moreStyleForIcon={{}}
                              iconSource={require('../../icons/correct.png')}
                              text1={'Victory'}
                              text2={`You won with ${totalPoints} points.`}
                              text3={`You answered correctly to all Questions`}
                              buttonText={'Play Again ?'}
                              moreStyleForButton={Styles.moreStyleButton}
                              onButtonPress={() => {
                                  let score: UserScore = {
                                      totalTimeSpent: timeSpent,
                                      category: category,
                                      difficulty: difficulty,
                                      score: totalPoints,
                                  };
                                  const tempArr = [...allScores, score].sort((a, b) => (b.score - a.score));

                                  dispatch(setAllScoresAction(tempArr));
                                  navigation.navigate('Start');
                                  dispatch(resetTriviaGameAction());
                              }}
            />
        </SafeAreaView>
    );
});
