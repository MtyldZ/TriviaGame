import React, {memo} from 'react';
import {SafeAreaView} from 'react-native';
import {Header} from '../../components/Header/Header';
import {BodyResultScreen} from '../../components/Body/BodyResultScreen';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviagame/action';
import {Styles} from './style';

export const WrongScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    return (
        <SafeAreaView style={Styles.container}>
            <Header moreStyle={[Styles.moreHeader]}
                    parts={[{text: 'Question', text2: (questionIndex + 1) + '/10', text2style: []}]}
            />
            <BodyResultScreen moreStyle={Styles.moreStyle}
                              moreStyleForIcon={Styles.moreStyleForIcon}
                              iconSource={require('../../icons/wrong.png')}
                              text1={'Wrong'}
                              text2={'You failed.'}
                              text3={'Total points ' + totalPoints + '.'}
                              buttonText={'Main Menu'}
                              moreStyleForButton={[Styles.moreStyleButton]}
                              onButtonPress={() => {
                                  navigation.navigate('Start');
                                  dispatch(resetTriviaGameAction());
                              }}
            />
        </SafeAreaView>
    );
});
