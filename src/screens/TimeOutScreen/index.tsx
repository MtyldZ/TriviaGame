import React, {memo, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {StateEnum} from '../../utils/state-enum';

export const Timeout = memo(() => {
    const navigation = useNavigation();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const [screenState, setScreenState] = useState(StateEnum.reading);

    const buttonPressEventHandler = useCallback(() => {
        if (screenState !== StateEnum.reading) {
            return;
        }
        setScreenState(StateEnum.pressed);
        navigation.dispatch(StackActions.replace('Start'));
    }, [navigation, screenState]);

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
                                  onPress={buttonPressEventHandler}
                                  disabled={screenState !== StateEnum.reading}>
                    <Text style={Styles.smallerText}>{'Main Menu'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
