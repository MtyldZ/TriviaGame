import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction, setAllScoresAction} from '../../store/triviagame/action';
import {UserScore} from '../../@types/types';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {DefaultResultBodyComponent} from '../../components/DefaultResultBodyComponent';
import {StackActions, useNavigation} from '@react-navigation/native';

export const VictoryScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    const category = useSelector(state => state.triviagame.chosenCategory);
    const difficulty = useSelector(state => state.triviagame.chosenDifficulty);
    const timeSpent = useSelector(state => state.triviagame.totalTimeSpent);
    const allScores = useSelector(state => state.triviagame.allScores);

    const pressHandler = useCallback(() => {
        let score: UserScore = {
            totalTimeSpent: timeSpent,
            category: category,
            difficulty: difficulty,
            score: totalPoints,
        };
        const tempArr = [...allScores, score].sort((a, b) => (b.score - a.score));

        dispatch(setAllScoresAction(tempArr));
        navigation.dispatch(StackActions.popToTop());
        dispatch(resetTriviaGameAction());
    }, [allScores, category, difficulty, dispatch, navigation, timeSpent, totalPoints]);

    return (
        <>
            <DefaultHeaderComponent theme={defaultThemes.victory}/>
            <DefaultResultBodyComponent theme={defaultThemes.victory} onPress={pressHandler}/>
        </>
    );
});
