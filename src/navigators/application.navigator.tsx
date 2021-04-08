import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StartScreen} from '../screens/StartScreen';
import {HighScoresScreen} from '../screens/HighScoresScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {VictoryScreen} from '../screens/VictoryScreen';
import {QuestionScreen} from '../screens/QuestionScreen';
import {CorrectScreen} from '../screens/CorrectScreen';
import {WrongScreen} from '../screens/WrongScreen';
import {TimeOutScreen} from '../screens/TimeOutScreen';
import {ParamType} from '../utils/types';

const initialParameter: ParamType<undefined> = {
    earnedPoint: 0,
    totalPoint: 0,
    questionIndex: 0,
};

const Stack = createStackNavigator<MainRouteParamList>();

export const ApplicationNavigator = memo(function ApplicationNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={SplashScreen}/>
            <Stack.Screen name='Start' component={StartScreen}/>
            <Stack.Screen name='HighScores' component={HighScoresScreen}/>
            <Stack.Screen name='Victory' component={VictoryScreen}/>
            <Stack.Screen name='Question' component={QuestionScreen}/>
            <Stack.Screen name='Correct' component={CorrectScreen} initialParams={initialParameter}/>
            <Stack.Screen name='Wrong' component={WrongScreen} initialParams={initialParameter}/>
            <Stack.Screen name='Timeout' component={TimeOutScreen} initialParams={initialParameter}/>
        </Stack.Navigator>
    );
});

type MainRouteParamList = {
    Splash: undefined;
    Start: undefined;
    HighScores: undefined;
    Victory: undefined;
    Question: undefined;
    Correct: ParamType<undefined>;
    Wrong: ParamType<undefined>;
    Timeout: ParamType<undefined>;
}
