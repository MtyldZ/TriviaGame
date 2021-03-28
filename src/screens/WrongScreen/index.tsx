import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetTriviaGameAction} from '../../store/triviaGame/action';
import {HeaderComponent} from '../../components/HeaderComponent';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';

export const WrongScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const [isDisabled, setIsDisabled] = useState(false);

    const buttonPressEventHandler = useCallback(() => {
        setIsDisabled(true);
        navigation.dispatch(StackActions.pop(1));
        navigation.dispatch(StackActions.replace('Start'));
        dispatch(resetTriviaGameAction());
        setIsDisabled(false);
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
            <HeaderComponent color={Colors.wrongHeader}/>
            <View style={Styles.container}>
                <Image source={require('../../assets/icons/wrong.png')} style={Styles.imageStyle}/>
                <Text style={Styles.biggerText}>{'Wrong'}</Text>
                <View style={Styles.middleViewContainer}>
                    <Text style={Styles.smallerText}>
                        {'You failed.'}
                    </Text>
                    <Text style={Styles.smallerText}>
                        {'Total points %%%.'.replace(/%%%/g, totalPoint.toString())}
                    </Text>
                </View>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={buttonPressEventHandler}
                                  disabled={isDisabled}>
                    <Text style={Styles.smallerText}>{'Main Menu'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
