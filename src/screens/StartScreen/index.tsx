import React, {useCallback} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {SelectorComponent} from '../../components/SelectorComponent';
import {fetchData} from '../../api/openTrivia';
import {useDispatch, useSelector} from 'react-redux';
import {
    setAllQuestionsAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setCurrentTotalPointAction,
} from '../../store/triviagame/action';

import {StackActions, useNavigation} from '@react-navigation/native';

const difficulties = ['Any Difficulty', 'Easy', 'Medium', 'Hard'];
const categories = [
    'Any Category',
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals &amp; Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science &amp; Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime &amp; Manga',
    'Entertainment: Cartoon &amp; Animations',
];

export function StartScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const chosenCategory = useSelector(state => state.triviagame.chosenCategory);
    const chosenDifficulty = useSelector(state => state.triviagame.chosenDifficulty);

    const onPressHandler = useCallback(() => {
        fetchData(categories.indexOf(chosenCategory) + 8,
            chosenDifficulty)
            .then(arr => {
                dispatch(setAllQuestionsAction(arr));
                dispatch(setCurrentTotalPointAction(0));
                navigation.dispatch(StackActions.push('Question'));
            });
    }, [chosenCategory, chosenDifficulty, dispatch, navigation]);

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.logoContainer}>
                <Image source={require('../../icons/trivia.png')} style={Styles.logoImage}/>
                <Text style={Styles.logoText}>A trivia game</Text>
            </View>

            <SelectorComponent array={categories} onChange={s => dispatch(setChosenCategoryAction(s))}/>
            <SelectorComponent array={difficulties} onChange={s => dispatch(setChosenDifficultyAction(s))}/>

            <TouchableOpacity style={Styles.buttonStyle} onPress={onPressHandler}>
                <Text style={Styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Styles.buttonStyle}
                              onPress={() => navigation.dispatch(StackActions.push('HighScores'))}>
                <Text style={Styles.buttonText}>HIGH SCORES</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
