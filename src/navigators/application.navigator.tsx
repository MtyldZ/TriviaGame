import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {SplashScreen} from '../screens/SplashScreen';

import {StartScreen} from '../screens/StartScreen';
import {QuestionScreen} from '../screens/QuestionScreen';
import {CorrectScreen} from '../screens/CorrectScreen';
import {WrongScreen} from '../screens/WrongScreen';
import {Timeout} from '../screens/TimeOutScreen';
import {VictoryScreen} from '../screens/VictoryScreen';
import {LeaderBoardScreen} from '../screens/LeaderBoardScreen';

const Stack = createStackNavigator();

export const ApplicationNavigator = memo(function ApplicationNavigator() {
    const route = useSelector(state => state.ui.switchNavigationRoute);
    const index = useSelector(state => state.triviagame.currentQuestionIndex);

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                renderIf(route === 'Splash')(() => (
                    <Stack.Screen name="Splash" component={SplashScreen}/>
                ))
            }
            {
                renderIf(route === 'Start')(() => (
                    <Stack.Screen name="Start" component={StartScreen}/>
                ))
            }
            {
                renderIf(route === 'HighScores')(() => (
                    <Stack.Screen name="HighScores" component={LeaderBoardScreen}/>
                ))
            }
            {
                renderIf(route === 'Question')(() => (
                    <Stack.Screen name="Question" component={index >= 10 ? VictoryScreen : QuestionScreen}/>
                ))
            }
            {
                renderIf(route === 'Correct')(() => (
                    <Stack.Screen name="Correct" component={CorrectScreen}/>
                ))
            }
            {
                renderIf(route === 'Wrong')(() => (
                    <Stack.Screen name="Wrong" component={WrongScreen}/>
                ))
            }
            {
                renderIf(route === 'Timeout')(() => (
                    <Stack.Screen name="Timeout" component={Timeout}/>
                ))
            }
        </Stack.Navigator>
    );
});
