import React, {memo, useCallback} from 'react';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviagame/action';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {DefaultResultBodyComponent} from '../../components/DefaultResultBodyComponent';

export const Timeout = memo(() => {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();

    const pressHandler = useCallback(
        () => {
            dispatch(resetTriviaGameAction());
            navigation.navigate('Start');
        }, [],
    );

    return (
        <>
            <DefaultHeaderComponent theme={defaultThemes.timeout}/>
            <DefaultResultBodyComponent theme={defaultThemes.timeout} onPress={pressHandler}/>
        </>
    );
});
