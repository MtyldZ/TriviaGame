import React, {memo} from 'react';
import {SafeAreaView} from 'react-native';
import {Header} from '../../components/Header/Header';
import {BodyResultScreen} from '../../components/Body/BodyResultScreen';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviagame/action';
import {Styles} from './style';

export const Timeout = memo(() => {
    const dispatch = useDispatch();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    const navigation = useSwitchNavigation();

    return (
        <SafeAreaView style={Styles.container}>
            <Header moreStyle={Styles.moreHeader}
                    parts={[
                        {text: 'Question', text2: (questionIndex + 1) + '/10', text2style: []},
                    ]}
            />
            <BodyResultScreen moreStyle={Styles.moreStyle}
                              moreStyleForIcon={Styles.moreStyleIcon}
                              iconSource={require('../../icons/timeout.png')}
                              text1={'Time Out'}
                              text2={'You failed.'}
                              text3={'Total points ' + totalPoints + '.'}
                              buttonText={'Main Menu'}
                              moreStyleForButton={Styles.moreStyleButton}
                              onButtonPress={() => {
                                  dispatch(resetTriviaGameAction());
                                  navigation.navigate('Start');
                              }}
            />
        </SafeAreaView>
    );
});
