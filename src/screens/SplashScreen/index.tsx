import {Alert, BackHandler, Text, View} from 'react-native';
import {Styles} from './style';
import React, {memo} from 'react';
import {useTimeout} from '../../hooks/timeout';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getCategoryListFromAPI} from '../../api/trivia-game-fetcher';
import {setCategoryListAction} from '../../store/triviaGame/action';
import {ScreenPropType} from '../../utils/types';

const DELAY_SECONDS = 2;

const onFetchFailed = () => {
    Alert.alert('Problem', 'Make sure that device has internet connection',
        [
            {
                text: 'Close',
                onPress: () => BackHandler.exitApp(),
            },
        ]);
};

export const SplashScreen = memo<ScreenPropType>(function SplashScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useTimeout(() => {
            getCategoryListFromAPI()
                .then(categoryList => {
                    dispatch(setCategoryListAction(categoryList));
                    navigation.dispatch(StackActions.replace('Start'));
                })
                .catch(onFetchFailed);
        },
        DELAY_SECONDS * 1000,
    );

    return (
        <View style={Styles.container}>
            <Text style={Styles.text}>
                Splash Screen{'\n'}
                Welcome Back{'\n'}
                Nothing Changed Here{'\n'}
                Since You Quit
            </Text>
        </View>
    );
});
