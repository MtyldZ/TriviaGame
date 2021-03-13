import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Header} from '../../components/Header/Header';
import {BodyResultScreen} from '../../components/Body/BodyResultScreen';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {incCurrentQuestionIndexAction} from '../../store/triviagame/action';

export function CorrectScreen(): ReactElement {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const earnedPoint = useSelector(state => state.triviagame.earnedPointFromLastQuestion);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    return (
        <SafeAreaView style={Styles.container}>
            <Header moreStyle={[Styles.moreHeader]}
                    parts={[{text: 'Question', text2: (questionIndex + 1) + '/10', text2style: []}]}
            />
            <BodyResultScreen moreStyle={Styles.body}
                              moreStyleForIcon={{}}
                              iconSource={require('../../icons/correct.png')}
                              text1={'Correct'}
                              text2={`You have earned ${earnedPoint} points`}
                              text3={`Total points ${totalPoints}.`}
                              buttonText={'Next Question'}
                              moreStyleForButton={[Styles.Choice]}
                              onButtonPress={() => {

                                  dispatch(incCurrentQuestionIndexAction());
                                  navigation.navigate('Question');
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
        backgroundColor: '#00b454',
    },
    body: {
        backgroundColor: '#00b354',
    },
    moreHeader: {
        backgroundColor: '#006d35',
    },
    Choice: {
        backgroundColor: '#006d35',
    },
});
