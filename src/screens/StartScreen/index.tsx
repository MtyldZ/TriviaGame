import React, {memo, useCallback, useState} from 'react';
import {Alert, BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {SelectorComponent} from '../../components/SelectorComponent';
import {fetchData} from '../../api/openTrivia';
import {useDispatch, useSelector} from 'react-redux';
import {
    resetTriviaGameAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setQuestionsAction,
} from '../../store/triviaGame/action';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {Difficulties} from '../../utils/difficulties';
import {Categories} from '../../utils/categories';

export const StartScreen = memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const chosenCategory = useSelector(state => state.triviaGame.chosenCategory);
    const chosenDifficulty = useSelector(state => state.triviaGame.chosenDifficulty);
    const [buttonAvailable, setButtonAvailable] = useState(false);

    const onPressHandler = useCallback(() => {
        setButtonAvailable(true);
        fetchData(Categories.indexOf(chosenCategory) + 8, chosenDifficulty)
            .then(arr => {
                dispatch(resetTriviaGameAction());
                dispatch(setQuestionsAction(arr));
                navigation.dispatch(StackActions.replace('Question'));
            }).then(() => setButtonAvailable(false));
    }, [chosenCategory, chosenDifficulty, dispatch, navigation]);

    const onBackRequestHandler = useCallback(() => {
        Alert.alert('Hold on!', 'Are you sure you want quit?', [
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
            <SelectorComponent array={Categories} onChange={s => dispatch(setChosenCategoryAction(s))}/>
            <SelectorComponent array={Difficulties} onChange={s => dispatch(setChosenDifficultyAction(s))}/>
            <TouchableOpacity style={Styles.buttonStyle} onPress={onPressHandler} disabled={buttonAvailable}>
                <Text style={Styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.buttonStyle} onPress={() => navigation.navigate('HighScores')}>
                <Text style={Styles.buttonText}>HIGH SCORES</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
});
