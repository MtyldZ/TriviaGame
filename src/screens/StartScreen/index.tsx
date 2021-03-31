import React, {memo, useCallback, useState} from 'react';
import {Alert, BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {fetchData} from '../../api/trivia-game-fetcher';
import {useDispatch} from 'react-redux';
import {
    resetTriviaGameAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setQuestionsAction,
} from '../../store/triviaGame/action';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SelectorComponent} from '../../components/SelectorComponent';
import {changeBusyAction} from '../../store/ui/action';
import {CATEGORIES, DIFFICULTIES} from '../../utils/constants';

const onFetchFails = () => {
    Alert.alert('Ohh sorry', 'It looks like we do not have enough questions to ask in that filter. Maybe next update we will.',
        [
            {
                text: 'Okay',
            },
        ]);
};

const onBackRequestHandler = () => {
    Alert.alert('Hold on!', 'Are you sure you want to quit?', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Quit', style: 'default', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
};

export const StartScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [chosenCategory, setChosenCategory] = useState(CATEGORIES[0]);
    const [chosenDifficulty, setChosenDifficulty] = useState(DIFFICULTIES[0]);

    const onStartPressHandler = useCallback(() => {
        dispatch(changeBusyAction(true));
        fetchData(CATEGORIES.indexOf(chosenCategory) + 8, chosenDifficulty)
            .then(questions => {
                dispatch(resetTriviaGameAction());
                dispatch(setChosenCategoryAction(chosenCategory));
                dispatch(setChosenDifficultyAction(chosenDifficulty));
                dispatch(setQuestionsAction(questions));
                navigation.navigate('Question');
            }).catch(onFetchFails)
            .finally(() => dispatch(changeBusyAction(false)));
    }, [chosenCategory, chosenDifficulty, dispatch, navigation]);

    const onHighScoresPressHandler = useCallback(() => {
        navigation.navigate('HighScores');
    }, [navigation]);

    useFocusEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackRequestHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackRequestHandler);
    });

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.logoContainer}>
                <Image source={require('../../assets/icons/trivia.png')}
                       style={Styles.logoImage}/>
                <Text style={Styles.logoText}>A trivia game</Text>
            </View>
            <SelectorComponent array={CATEGORIES}
                               onChange={setChosenCategory}/>
            <SelectorComponent array={DIFFICULTIES}
                               onChange={setChosenDifficulty}/>
            <TouchableOpacity style={Styles.buttonStyle}
                              onPress={onStartPressHandler}>
                <Text style={Styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.buttonStyle}
                              onPress={onHighScoresPressHandler}>
                <Text style={Styles.buttonText}>HIGH SCORES</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
});
