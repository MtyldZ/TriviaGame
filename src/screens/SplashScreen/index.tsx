import {Text, View} from 'react-native';
import {Styles} from './style';
import React from 'react';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useTimeout} from '../../hooks/timeout';

const DELAY_SECONDS = 2;

export function SplashScreen() {
    const navigation = useSwitchNavigation();
    useTimeout(
        () => navigation.navigate('Start'),
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
