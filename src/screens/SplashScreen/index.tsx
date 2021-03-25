import {Text, View} from 'react-native';
import {Styles} from './style';
import React, {memo} from 'react';
import {useTimeout} from '../../hooks/timeout';
import {useNavigation} from '@react-navigation/native';

const DELAY_SECONDS = 2;

export const SplashScreen = memo(() => {
    const navigation = useNavigation();
    useTimeout(
        () => navigation.navigate('Start'),
        DELAY_SECONDS * 1000,
    );

    return (
        <View style={Styles.container}>
            <Text style={Styles.rowPartText}>
                Splash Screen
            </Text>
            <Text style={Styles.rowPartText}>
                Welcome Back
            </Text>
            <Text style={Styles.rowPartText}>
                Nothing Changed Here
            </Text>
            <Text style={Styles.rowPartText}>
                Since You Quit
            </Text>
        </View>
    );
});
