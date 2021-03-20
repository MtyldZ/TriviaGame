import React, {useCallback} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {SelectorComponent} from '../../components/SelectorComponent';
import {fetchData} from '../../api/openTrivia';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
    setAllQuestionsAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setCurrentTotalPointAction,
} from '../../store/triviagame/action';

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
    const navigation = useSwitchNavigation();
    const chosenCategory = useSelector(state => state.triviagame.chosenCategory);
    const chosenDifficulty = useSelector(state => state.triviagame.chosenDifficulty);

    const onPressHandler = useCallback(() => {
        fetchData(categories.indexOf(chosenCategory) + 8,
            chosenDifficulty)
            .then(arr => {
                dispatch(setAllQuestionsAction(arr));
                dispatch(setCurrentTotalPointAction(0));
                navigation.navigate('Question');
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

            <TouchableOpacity style={Styles.buttonContainer} onPress={onPressHandler}>
                <Text style={Styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Styles.buttonContainer}
                              onPress={() => navigation.navigate('HighScores')}>
                <Text style={Styles.buttonText}>HIGH SCORES</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
