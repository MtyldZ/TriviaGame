import React, {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {DefaultResultBodyComponent} from '../../components/DefaultResultBodyComponent';
import {incCurrentQuestionIndexAction} from '../../store/triviagame/action';
import {StackActions, useNavigation} from '@react-navigation/native';

export const CorrectScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const pressHandler = useCallback(
        () => {
            dispatch(incCurrentQuestionIndexAction());
            navigation.dispatch(StackActions.replace('Question'));
        }, [dispatch, navigation],
    );

    return (
        <>
            <DefaultHeaderComponent theme={defaultThemes.correct}/>
            <DefaultResultBodyComponent theme={defaultThemes.correct} onPress={pressHandler}/>
        </>
    );
});
