import React, {memo, useCallback} from 'react';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviagame/action';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {DefaultResultBodyComponent} from '../../components/DefaultResultBodyComponent';

export const WrongScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();

    const pressHandler = useCallback(
        () => {
            navigation.navigate('Start');
            dispatch(resetTriviaGameAction());
        }, [navigation],
    );

    return (
        <>
            <DefaultHeaderComponent theme={defaultThemes.wrong}/>
            <DefaultResultBodyComponent theme={defaultThemes.wrong} onPress={pressHandler}/>
        </>
    );
});
