import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviaGame/action';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {Styles} from '../TimeOutScreen/style';
import {BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';

export const VictoryScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);

    const buttonPressEventHandler = useCallback(() => {
        navigation.navigate('Start');
        dispatch(resetTriviaGameAction());
    }, [dispatch, navigation]);

    const hardwareBackPressEventHandler = useCallback(() => {
        buttonPressEventHandler();
        return true;
    }, [buttonPressEventHandler]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    return (
        <>
            <HeaderComponent color={Colors.victoryHeader}/>
            <View style={Styles.container}>
                <Image source={require('../../assets/icons/victory.png')} style={Styles.imageStyle}/>
                <Text style={Styles.biggerText}>{'Victory'}</Text>
                <View style={Styles.middleViewContainer}>
                    <Text style={Styles.smallerText}>
                        {'You answered correctly to all Questions'}
                    </Text>
                    <Text style={Styles.smallerText}>
                        {'You won with %%% points.'.replace(/%%%/g, totalPoint.toString())}
                    </Text>
                </View>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={buttonPressEventHandler}>
                    <Text style={Styles.smallerText}>{'Main Menu'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
