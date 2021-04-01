import {Alert, BackHandler, Text, View} from 'react-native';
import {Styles} from './style';
import React, {memo} from 'react';
import {useTimeout} from '../../hooks/timeout';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchCategory} from '../../api/trivia-game-fetcher';
import {setCategoriesAction} from '../../store/triviaGame/action';

const DELAY_SECONDS = 2;

const onFetchFails = () => {
    Alert.alert('Problem', 'Make sure that device has internet connection',
        [
            {
                text: 'Try again',
                onPress: () => BackHandler.exitApp(),
            },
        ]);
};

export const SplashScreen = memo(function SplashScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useTimeout(() => {
            fetchCategory().then(categoryList => {
                dispatch(setCategoriesAction(categoryList));
            })
                .then(() => navigation.dispatch(StackActions.replace('Start')))
                .catch(onFetchFails);
        },
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
