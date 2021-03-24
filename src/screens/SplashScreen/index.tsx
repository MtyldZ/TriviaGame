import {Text, View} from 'react-native';
import {Styles} from './style';
import React from 'react';
import {useTimeout} from '../../hooks/timeout';
import {StackActions, useNavigation} from '@react-navigation/native';

const DELAY_SECONDS = 2;

export function SplashScreen() {
    const navigation = useNavigation();
    useTimeout(
        () => navigation.dispatch(StackActions.replace('Start')),
        DELAY_SECONDS * 1000,
    );

    return (
        <View style={Styles.container}>
            <Text style={Styles.text}>
                Splash Screen
            </Text>
            <Text style={Styles.text}>
                Welcome Back
            </Text>
            <Text style={Styles.text}>
                Nothing Changed Here
            </Text>
            <Text style={Styles.text}>
                Since You Quit
            </Text>
        </View>
    );
}
