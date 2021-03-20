import React, {memo, useCallback} from 'react';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction, setAllScoresAction} from '../../store/triviagame/action';
import {UserScore} from '../../@types/types';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {DefaultResultBodyComponent} from '../../components/DefaultResultBodyComponent';

export const VictoryScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();
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
        navigation.navigate('Start');
        dispatch(resetTriviaGameAction());
    }, []);

    return (
        <>
            <DefaultHeaderComponent theme={defaultThemes.victory}/>
            <DefaultResultBodyComponent theme={defaultThemes.victory} onPress={pressHandler}/>
        </>
    );
});
