import React, {memo, useCallback, useState} from 'react';
import {Alert, BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {fetchData} from '../../api/openTrivia';
import {useDispatch} from 'react-redux';
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
    const [chosenCategory, setChosenCategory] = useState(Categories[0]);
    const [chosenDifficulty, setChosenDifficulty] = useState(Difficulties[0]);
    const [isDisabled, setIsDisabled] = useState(false);

    const dispatchFunction = useCallback((questions: Question[]) => {
        dispatch(resetTriviaGameAction());
        dispatch(setChosenCategoryAction(chosenCategory));
        dispatch(setChosenDifficultyAction(chosenDifficulty));
        dispatch(setQuestionsAction(questions));
        navigation.dispatch(StackActions.replace('Question'));
    }, [chosenCategory, chosenDifficulty, dispatch, navigation]);

    const onPressHandler = useCallback(() => {
        setIsDisabled(true);
        dispatch(changeBusyAction(true));
        fetchData(Categories.indexOf(chosenCategory) + 8, chosenDifficulty)
            .then((questions: Question[]) => dispatchFunction(questions))
            .catch(() => alertFunction())
            .finally(() => {
                setIsDisabled(false);
                dispatch(changeBusyAction(false));
            });
    }, [chosenCategory, chosenDifficulty, dispatch, dispatchFunction]);

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
        <>
            <SafeAreaView style={Styles.container}>
                <View style={Styles.logoContainer}>
                    <Image source={require('../../assets/icons/trivia.png')} style={Styles.logoImage}/>
                    <Text style={Styles.logoText}>A trivia game</Text>
                </View>
                <SelectorComponent array={Categories}
                                   onChange={s => setChosenCategory(s)}/>
                <SelectorComponent array={Difficulties}
                                   onChange={s => setChosenDifficulty(s)}/>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={onPressHandler}
                                  disabled={isDisabled}>
                    <Text style={Styles.buttonText}>GET STARTED</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonStyle}
                                  onPress={() => navigation.navigate('HighScores')}>
                    <Text style={Styles.buttonText}>HIGH SCORES</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
});
