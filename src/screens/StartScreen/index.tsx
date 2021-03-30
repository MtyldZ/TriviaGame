import React, {memo, useCallback} from 'react';
import {Alert, BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {fetchData} from '../../api/openTrivia';
import {useDispatch, useSelector} from 'react-redux';
import {
    resetTriviaGameAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setQuestionsAction,
} from '../../store/triviaGame/action';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {SelectorComponent} from '../../components/SelectorComponent';
import {changeBusyAction} from '../../store/ui/action';
import {Question} from '../../utils/types';
import {Categories, Difficulties} from '../../utils/constants';

const alertFunction = () => {
    Alert.alert('Ohh sorry',
        'It looks like we do not have enough questions to ask in that filter. Maybe next update we will.',
        [
            {
                text: 'Okay',
                onPress: () => null,
            },
        ]);
};

export const StartScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const chosenCategory = useSelector(state => state.triviaGame.chosenCategory);
    const chosenDifficulty = useSelector(state => state.triviaGame.chosenDifficulty);

    const categorySetHandler = useCallback((newCategory: string) => {
        dispatch(setChosenCategoryAction(newCategory));
    }, [dispatch]);

    const difficultySetHandler = useCallback((newDifficulty: string) => {
        dispatch(setChosenDifficultyAction(newDifficulty));
    }, [dispatch]);

    const dispatchFunction = useCallback((questions: Question[]) => {
        dispatch(resetTriviaGameAction());
        dispatch(setQuestionsAction(questions));
        navigation.dispatch(StackActions.replace('Question'));
    }, [dispatch, navigation]);

    const onStartPressHandler = useCallback(() => {
        dispatch(changeBusyAction(true));
        fetchData(Categories.indexOf(chosenCategory) + 8, chosenDifficulty)
            .then((questions: Question[]) => dispatchFunction(questions))
            .catch(() => alertFunction())
            .finally(() => dispatch(changeBusyAction(false)));
    }, [chosenCategory, chosenDifficulty, dispatch, dispatchFunction]);

    const onHighScoresPressHandler = useCallback(() => {
        dispatch(changeBusyAction(true));
        navigation.navigate('HighScores');
        dispatch(changeBusyAction(false));
    }, [dispatch, navigation]);

    const onBackRequestHandler = useCallback(() => {
        Alert.alert('Hold on!', 'Are you sure you want to quit?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Quit', style: 'default', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
    }, []);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackRequestHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackRequestHandler);
    }, [onBackRequestHandler]));

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.logoContainer}>
                <Image source={require('../../assets/icons/trivia.png')} style={Styles.logoImage}/>
                <Text style={Styles.logoText}>A trivia game</Text>
            </View>
            <SelectorComponent array={Categories}
                               onChange={categorySetHandler}/>
            <SelectorComponent array={Difficulties}
                               onChange={difficultySetHandler}/>
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
