import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Header} from '../../components/Header/Header';
import {BodyResultScreen} from '../../components/Body/BodyResultScreen';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useSelector} from 'react-redux';

export function Timeout(): ReactElement {
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    const navigation = useSwitchNavigation();
    return (
        <SafeAreaView style={Styles.container}>
            <Header moreStyle={[Styles.moreHeader]}
                    parts={[
                        {text: 'Question', text2: (questionIndex + 1) + '/10', text2style: []},
                    ]}
            />
            <BodyResultScreen moreStyle={Styles.body}
                              moreStyleForIcon={{width: 135, height: 135}}
                              iconSource={require('../../icons/timeout.png')}
                              text1={'Time Out'}
                              text2={'You failed.'}
                              text3={'Total points ' + totalPoints + '.'}
                              buttonText={'Main Menu'}
                              moreStyleForButton={[Styles.Choice]}
                              onButtonPress={() => navigation.navigate('Start')}
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
});

