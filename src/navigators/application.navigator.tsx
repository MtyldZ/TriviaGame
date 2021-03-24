import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {StartScreen} from '../screens/StartScreen';
import {LeaderBoardScreen} from '../screens/LeaderBoardScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {VictoryScreen} from '../screens/VictoryScreen';
import {QuestionScreen} from '../screens/QuestionScreen';
import {CorrectScreen} from '../screens/CorrectScreen';
import {WrongScreen} from '../screens/WrongScreen';
import {Timeout} from '../screens/TimeOutScreen';

const Stack = createStackNavigator();

export const ApplicationNavigator = memo(function ApplicationNavigator() {
    const index = useSelector(state => state.triviagame.currentQuestionIndex);

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*{*/}
            {/*    renderIf(route === 'Splash')(() => (*/}
            {/*        <Stack.Screen name="Splash" component={SplashScreen}/>*/}
            {/*    ))*/}
            {/*}*/}
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Start" component={StartScreen}/>
            <Stack.Screen name="HighScores" component={LeaderBoardScreen}/>
            <Stack.Screen name="Question" component={index === 10 ? VictoryScreen : QuestionScreen}/>
            <Stack.Screen name="Correct" component={CorrectScreen}/>
            <Stack.Screen name="Wrong" component={WrongScreen}/>
            <Stack.Screen name="Timeout" component={Timeout}/>
        </Stack.Navigator>
    );
});
