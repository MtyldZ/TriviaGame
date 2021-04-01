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

const Stack = createStackNavigator();

export const ApplicationNavigator = memo(function ApplicationNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*{renderIf(route === 'Splash')(() => (<Stack.Screen name="Splash" component={SplashScreen}/>))}*/}
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Start" component={StartScreen}/>
            <Stack.Screen name="HighScores" component={HighScoresScreen}/>
            <Stack.Screen name="Victory" component={VictoryScreen}/>
            <Stack.Screen name="Question" component={QuestionScreen}/>
            <Stack.Screen name="Correct" component={CorrectScreen}/>
            <Stack.Screen name="Wrong" component={WrongScreen}/>
            <Stack.Screen name="Timeout" component={TimeOutScreen}/>
        </Stack.Navigator>
    );
});
