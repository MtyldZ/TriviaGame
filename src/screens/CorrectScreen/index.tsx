import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {incrementQuestionIndexAction} from '../../store/triviaGame/action';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';

export const CorrectScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const earnedPoint = useSelector(state => state.triviaGame.lastEarnedPointAmount);
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);

    const pressHandler = useCallback(
        () => {
            dispatch(incrementQuestionIndexAction());
            navigation.dispatch(StackActions.replace('Question'));
        }, [dispatch, navigation]);

    return (
        <>
            <HeaderComponent color={Colors.correctHeader}/>
            <View style={Styles.container}>
                <Image source={require('../../assets/icons/correct.png')} style={Styles.imageStyle}/>
                <Text style={Styles.biggerText}>{'Correct'}</Text>
                <View style={Styles.middleViewContainer}>
                    <Text style={Styles.smallerText}>
                        {'You have earned %%% points.'.replace(/%%%/g, earnedPoint.toString())}
                    </Text>
                    <Text style={Styles.smallerText}>
                        {'Total points %%%.'.replace(/%%%/g, totalPoint.toString())}
                    </Text>
                </View>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={pressHandler}>
                    <Text style={Styles.smallerText}>{'Next Question'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
