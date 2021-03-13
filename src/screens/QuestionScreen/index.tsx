import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Styles} from './style';
import {Header} from '../../components/Header/Header';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {ChoiceComponent} from '../../components/Choice';
import {useDispatch, useSelector} from 'react-redux';
import {incCurrentTotalPointAction, incTotalTimeSpentAction} from '../../store/triviagame/action';
import {CalculateEarnedPoint} from '../../components/CalculateEarnedPoint';
import {Question} from '../../@types/types';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';

const optionNames = ['A', 'B', 'C', 'D'];

export function QuestionScreen() {
    const dispatch = useDispatch();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
    const allQuestions: Question[] = useSelector(state => state.triviagame.allQuestions);
    const questionObject: Question = allQuestions[questionIndex];

    const navigation = useSwitchNavigation();
    const [count, setCount] = useState(15);
    const [allChoices, setAllChoices] = useState([...questionObject.wrong_answers, questionObject.correct_answer]);
    const choices = useMemo(() => randomizer(allChoices), [allChoices]);

    useEffect(() => {
        const intervalToDecrease = setInterval(() =>
                setCount(prevState => (prevState > 0 ? prevState - 1 : 0)),
            1000);

        if (count === 0) {
            navigation.navigate('Timeout');
        }
        return () => clearInterval(intervalToDecrease);
    }, [count]);

    return (
        <>
            <SafeAreaView style={Styles.container}>
                <Header moreStyle={Styles.moreHeader}
                        parts={[
                            {text: 'Question', text2: (questionIndex + 1) + '/10', text2style: {}},
                            {text: 'Points', text2: totalPoints + '', text2style: {}},
                            {text: 'Remaining Time', text2: count + '', text2style: {}},
                        ]}
                />
                <ScrollView style={{flex: 1}} contentContainerStyle={Styles.scrollView}>
                    <View style={Styles.FiftyPercentJokerContainer}>
                        <FiftyPercentJokerComponent
                            onPress={() => setAllChoices(fiftyPercentJokerHandler(questionObject.wrong_answers, questionObject.correct_answer))}/>
                    </View>
                    <View style={Styles.midQuestionContainer}>
                        <Text style={Styles.midQuestionText}>
                            {questionObject.questionText.replace(/&quot;/g, '"')
                                .replace(/&#039;/g, '"')}
                        </Text>
                    </View>
                    {
                        choices.map((value, index) =>
                            <ChoiceComponent onPress={() => {
                                if (questionObject.correct_answer === value) {
                                    dispatch(incCurrentTotalPointAction(CalculateEarnedPoint(count, questionObject.difficulty)));
                                    dispatch(incTotalTimeSpentAction(15 - count));
                                    navigation.navigate('Correct');
                                } else {
                                    navigation.navigate('Wrong');
                                }
                            }}
                                             choiceName={optionNames[index]}
                                             choiceText={value.replace(/&quot;/g, '"')
                                                 .replace(/&#039;/g, '"')}
                                             key={`part${index}`}
                            />,
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

function fiftyPercentJokerHandler(wrongAnswers: string[], correctAnswer: string) {
    let i = Math.round(Math.random() * (wrongAnswers.length - 1));
    return [wrongAnswers[i], correctAnswer];
}


function randomizer(array: String[]) {
    const tempArr = [...array];
    tempArr.sort(() => .5 - Math.random() - 1); // added -1 to not randomize :)
    return tempArr;
}
