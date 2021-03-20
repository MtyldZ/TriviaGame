import React, {memo, useCallback} from 'react';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch} from 'react-redux';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {DefaultResultBodyComponent} from '../../components/DefaultResultBodyComponent';
import {incCurrentQuestionIndexAction} from '../../store/triviagame/action';

export const CorrectScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useSwitchNavigation();

    const pressHandler = useCallback(
        () => {
            dispatch(incCurrentQuestionIndexAction());
            navigation.navigate('Question');
        }, [],
    );

    return (
        <>
            <DefaultHeaderComponent theme={defaultThemes.correct}/>
            <DefaultResultBodyComponent theme={defaultThemes.correct} onPress={pressHandler}/>
        </>
    );
});
