import React, {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviagame/action';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {DefaultResultBodyComponent} from '../../components/DefaultResultBodyComponent';
import {StackActions, useNavigation} from '@react-navigation/native';

export const Timeout = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const pressHandler = useCallback(
        () => {
            dispatch(resetTriviaGameAction());
            navigation.dispatch(StackActions.popToTop());
        }, [dispatch, navigation],
    );

    return (
        <>
            <DefaultHeaderComponent theme={defaultThemes.timeout}/>
            <DefaultResultBodyComponent theme={defaultThemes.timeout} onPress={pressHandler}/>
        </>
    );
});
