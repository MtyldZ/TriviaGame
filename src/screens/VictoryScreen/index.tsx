import React, {memo, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {Styles} from '../TimeOutScreen/style';
import {BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';
import {StateEnum} from '../../utils/state-enum';

export const VictoryScreen = memo(() => {
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
                                  onPress={buttonPressEventHandler}
                                  disabled={screenState !== StateEnum.reading}>
                    <Text style={Styles.smallerText}>{'Main Menu'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});
