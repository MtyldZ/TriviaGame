import React, {memo, useCallback, useState} from 'react';
import {Alert, BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {getQuestionListByIdAndDifficultFromAPI} from '../../api/trivia-game-fetcher';
import {useDispatch, useSelector} from 'react-redux';
import {
    resetTriviaGameAction,
    setChosenCategoryAction,
    setChosenDifficultyAction,
    setQuestionListAction,
} from '../../store/triviaGame/action';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SelectorComponent} from '../../components/SelectorComponent';
import {changeBusyAction} from '../../store/ui/action';
import {DIFFICULTIES} from '../../utils/constants';

const onFetchFails = () => {
    Alert.alert('Ohh sorry', 'It looks like we do not have enough questions to ask in that filter. Maybe next update we will.',
        [
            {
                text: 'Okay',
            },
        ]);
};

const onBackPressed = () => {
    Alert.alert('Hold on!', 'Are you sure you want to quit?', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Quit', style: 'default', onPress: BackHandler.exitApp},
    ]);
    return true;
};

export const StartScreen = memo(function StartScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const categoryList = useSelector(state => state.triviaGame.categoryList);
    // const difficultyList = useSelector(state => state.triviaGame.difficultyList);
    const difficultyList = DIFFICULTIES;
    const [chosenCategory, setChosenCategory] = useState(categoryList[0]);
    const [chosenDifficulty, setChosenDifficulty] = useState(difficultyList[0]);

    const onStartPressed = useCallback(() => {
        dispatch(changeBusyAction(true));
        getQuestionListByIdAndDifficultFromAPI(chosenCategory.id, chosenDifficulty.name)
            .then(questions => {
                dispatch(resetTriviaGameAction());
                dispatch(setChosenCategoryAction(chosenCategory.name));
                dispatch(setChosenDifficultyAction(chosenDifficulty.name));
                dispatch(setQuestionListAction(questions));
                navigation.navigate('Question');
            }).catch(onFetchFails)
            .finally(() => dispatch(changeBusyAction(false)));
    }, [chosenCategory, chosenDifficulty, dispatch, navigation]);

    const onHighScoresPressed = useCallback(() => {
        navigation.navigate('HighScores');
    }, [navigation]);

    useFocusEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPressed);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPressed);
    });

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.logoContainer}>
                <Image source={require('../../assets/icons/trivia.png')}
                       style={Styles.logoImage}/>
                <Text style={Styles.logoText}>A trivia game</Text>
            </View>
            <SelectorComponent optionList={categoryList}
                               onChange={setChosenCategory}/>
            <SelectorComponent optionList={difficultyList}
                               onChange={setChosenDifficulty}/>
            <TouchableOpacity style={Styles.buttonStyle}
                              onPress={onStartPressed}>
                <Text style={Styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.buttonStyle}
                              onPress={onHighScoresPressed}>
                <Text style={Styles.buttonText}>HIGH SCORES</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
});
