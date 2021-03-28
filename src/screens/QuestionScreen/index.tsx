import React, {memo, useCallback, useEffect, useState} from 'react';
import {Alert, BackHandler, SafeAreaView, Text, View} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
    incrementTotalPointAction,
    incrementTotalTimeSpentAction,
    resetTriviaGameAction,
} from '../../store/triviaGame/action';
import {Question} from '../../utils/types';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {HeaderComponent} from '../../components/HeaderComponent';
import {Choice, ChoiceComponent} from '../../components/ChoiceComponent';
import {textReplace} from '../../utils/replace-text';
import {randomizer} from '../../utils/randomizer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/color';
import {DefaultQuestion} from '../../utils/defaultObjects';
import {calculateEarnedPoint} from '../../utils/calculate-earned-point';
import {rx} from '../../utils/dimensions';

const optionNames = ['A', 'B', 'C', 'D'];

const QuestionTextPartComponent = memo((props: { questionObject: Question }) => {
    const lineNumberNeededNormally = Math.ceil(props.questionObject.questionText.length / 32);
    const neededHeight = 40 * lineNumberNeededNormally * rx;

    return (
        <View style={[Styles.questionContainer, {height: neededHeight}]}>
            <Text style={Styles.questionTextStyle} adjustsFontSizeToFit={true}>
                {textReplace(props.questionObject.questionText)}
            </Text>
        </View>
    );
});

const createChoiceArray = (arr: string[], choicePressHandler: (str: string) => void) => {
    const tempChoices: Choice[] = [];
    arr.map((value, index) => tempChoices.push({
        choiceName: optionNames[index],
        choiceText: value,
        onPress: () => choicePressHandler(value),
        disabled: false,
    }));
    return tempChoices;
};

const fiftyPercentEventHandler = (arr: string[], choiceArr: Choice[]) => {
    const tempChoices: Choice[] = [];
    for (let choice of choiceArr) {
        tempChoices.push(
            {
                ...choice,
                disabled: arr.indexOf(choice.choiceText) === -1,
            },
        );
    }
    return tempChoices;
};


export const QuestionScreen = memo(() => {
    const dispatch = useDispatch();
    const totalPoints = useSelector(state => state.triviaGame.totalPoint);
    const navigation = useNavigation();
    const totalTimeSpent = useSelector(state => state.triviaGame.totalTimeSpent);
    const [count, setCount] = useState(15);
    const questionObject: Question = useSelector(state =>
        state.triviaGame.questions[state.triviaGame.questionIndex]) || DefaultQuestion;

    const choicePressHandler = useCallback((value: string) => {
        if (questionObject.correctAnswer === value) {
            console.log(count);
            console.log(totalTimeSpent);
            dispatch(incrementTotalPointAction(calculateEarnedPoint(count, questionObject.difficulty)));
            dispatch(incrementTotalTimeSpentAction(15 - count));
            navigation.navigate('Correct');
        } else {
            navigation.navigate('Wrong');
        }
    }, [count, dispatch, navigation, questionObject.correctAnswer, questionObject.difficulty, totalTimeSpent]);


    const [allChoices, setAllChoices] = useState(
        createChoiceArray(randomizer([...questionObject.wrongAnswers, questionObject.correctAnswer]),
            choicePressHandler),
    );

    const hardwareBackPressEventHandler = useCallback(() => {
        Alert.alert('Caution!', 'Are you sure you want give up?', [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Give Up',
                style: 'default',
                onPress: () => {
                    navigation.navigate('Start');
                    dispatch(resetTriviaGameAction());
                },
            },
        ]);
        return true;
    }, [dispatch, navigation]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    useEffect(() => {
        const intervalToDecrease = setInterval(() => setCount(prev => (prev !== 0 ? prev - 1 : 0)), 1000);
        // if (count === 0) {
        //     navigation.navigate('Timeout');
        // }
        return () => {
            clearInterval(intervalToDecrease);
        };
    }, [count, navigation]);

    return (
        <SafeAreaView style={Styles.container}>
            <HeaderComponent color={Colors.questionHeader}
                             parts={[
                                 {first: 'Points', second: totalPoints.toString()},
                                 {first: 'Remaining Time', second: count.toString()},
                             ]}/>
            <View style={Styles.bodyPartContainer}>
                <View style={Styles.jokerContainer}>
                    <FiftyPercentJokerComponent onPress={(strings) =>
                        setAllChoices(fiftyPercentEventHandler(strings, allChoices))}/>
                </View>
                <QuestionTextPartComponent questionObject={questionObject}/>
                {
                    allChoices.map((choice, index) =>
                        <ChoiceComponent choiceName={choice.choiceName}
                                         choiceText={choice.choiceText}
                                         onPress={choice.onPress}
                                         disabled={choice.disabled}
                                         key={`key_${index}`}
                        />)
                }
            </View>
        </SafeAreaView>
    );
});
