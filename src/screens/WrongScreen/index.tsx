import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {BackHandler, View} from 'react-native';
import {Styles} from './style';
import {StateEnum} from '../../utils/state-enum';
import {UserScore} from '../../utils/types';
import {setHighScoreListAction} from '../../store/triviaGame/action';
import {ButtonComponent} from '../../components/ButtonComponent';
import {ResultBodyComponent} from '../../components/ResultBodyComponent';

export const WrongScreen = memo(function WrongScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const questionListLength = useSelector(state => state.triviaGame.questionList.length);
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const category = useSelector(state => state.triviaGame.chosenCategory);
    const difficulty = useSelector(state => state.triviaGame.chosenDifficulty);
    const timeSpent = useSelector(state => state.triviaGame.totalTimeSpent);
    const allScores = useSelector(state => state.triviaGame.highScoreList);
    const [screenState, setScreenState] = useState(StateEnum.reading);

    const onButtonPress = useCallback(() => {
        if (screenState !== StateEnum.reading) {
            return;
        }
        setScreenState(StateEnum.pressed);
        if (questionIndex > Math.round(questionListLength / 2)) {
            const score: UserScore = {
                totalTimeSpent: timeSpent,
                category: category,
                difficulty: difficulty,
                score: totalPoint,
            };
            const tempArr = [...allScores, score].sort((a, b) => (
                b.score - a.score));
            dispatch(setHighScoreListAction(tempArr));
        }
        navigation.goBack();
    }, [allScores, category, difficulty, dispatch, navigation, questionIndex, questionListLength, screenState, timeSpent, totalPoint]);

    const hardwareBackPressEventHandler = useCallback(() => {
        onButtonPress();
        return true;
    }, [onButtonPress]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    return (
        <>
            <HeaderComponent color={Colors.wrongHeader}/>
            <View style={Styles.container}>
                <ResultBodyComponent
                    image={require('../../assets/icons/wrong.png')}
                    title={'Wrong'}
                    otherTexts={[
                        'You failed.',
                        `Total points ${totalPoint.toString()}.`]}/>
                <ButtonComponent
                    onPress={onButtonPress}
                    buttonText={'Main Menu'}
                    color={Colors.wrongButton}
                    isDisabled={screenState !== StateEnum.reading}/>
            </View>
        </>
    );
});
