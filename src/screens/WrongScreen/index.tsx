import React, {memo, ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Header} from '../../components/Header/Header';
import {BodyResultScreen} from '../../components/Body/BodyResultScreen';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviagame/action';

export const WrongScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    return (
        <SafeAreaView style={Styles.container}>
            <Header moreStyle={[Styles.moreHeader]}
                    parts={[
                        {text: 'Question', text2: (questionIndex+1) + '/10', text2style: []},
                    ]}
            />
            <BodyResultScreen moreStyle={Styles.body}
                              moreStyleForIcon={Styles.moreStyleForIcon}
                              iconSource={require('../../icons/wrong.png')}
                              text1={'Wrong'}
                              text2={'You failed.'}
                              text3={'Total points ' + totalPoints + '.'}
                              buttonText={'Main Menu'}
                              moreStyleForButton={[Styles.Choice]}
                              onButtonPress={() => {
                                  navigation.navigate('Start');
                                  dispatch(resetTriviaGameAction());
                              }}
            />
        </SafeAreaView>
    );
});

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#fd0041',
    },
    body: {
        backgroundColor: '#fd0041',
    },
    moreHeader: {
        backgroundColor: '#a0002c',
    },
    Choice: {
        backgroundColor: '#a0002c',
    },
    moreStyleForIcon: {
        height: 150,
        width: 150,
    },
});

