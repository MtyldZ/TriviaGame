import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviaGame/action';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';

export const Timeout = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);

    const pressHandler = useCallback(
        () => {
            dispatch(resetTriviaGameAction());
            navigation.navigate('Start');
        }, [dispatch, navigation]);

    return (
        <>
            <HeaderComponent color={Colors.timeOutHeader}/>
            <View style={Styles.container}>
                <Image source={require('../../assets/icons/timeout.png')} style={Styles.imageStyle}/>
                <Text style={Styles.biggerText}>{'Time Out'}</Text>
                <View style={Styles.middleViewContainer}>
                    <Text style={Styles.smallerText}>
                        {'You failed.'}
                    </Text>
                    <Text style={Styles.smallerText}>
                        {'Total points %%%.'.replace(/%%%/g, totalPoint.toString())}
                    </Text>
                </View>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={pressHandler}>
                    <Text style={Styles.smallerText}>{'Main Menu'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
