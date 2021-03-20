import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Styles} from './style';
import {useSwitchNavigation} from '../../store/ui/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {incCurrentTotalPointAction, incTotalTimeSpentAction} from '../../store/triviagame/action';
import {calculateEarnedPoint} from '../../utils/calculateEarnedPoint';
import {Question} from '../../@types/types';
import {FiftyPercentJokerComponent} from '../../components/FiftyPercentJokerComponent';
import {DefaultHeaderComponent} from '../../components/DefaultHeaderComponent';
import {defaultThemes} from '../../utils/themes';
import {ChoiceComponent} from '../../components/ChoiceComponent';

const optionNames = ['A', 'B', 'C', 'D'];

export function QuestionScreen() {
    const dispatch = useDispatch();
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const allQuestions: Question[] = useSelector(state => state.triviagame.allQuestions);
    const totalPoints = useSelector(state => state.triviagame.currentTotalPoint);
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
    }, [count, navigation]);

    return (
        <>
            <SafeAreaView style={Styles.container}>
                <DefaultHeaderComponent theme={defaultThemes.question}
                                        parts={[
                                            {first: 'Points', second: totalPoints + ''},
                                            {first: 'Remaining Time', second: count + ''},
                                        ]}/>
                <ScrollView style={{flex: 1}} contentContainerStyle={Styles.scrollView}>
                    <View style={Styles.FiftyPercentJokerContainer}>
                        <FiftyPercentJokerComponent
                            onPress={(strings) => setAllChoices(strings)}/>
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
                                    dispatch(incCurrentTotalPointAction(calculateEarnedPoint(count, questionObject.difficulty)));
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


function randomizer(array: String[]) {
    const tempArr = [...array];
    tempArr.sort(() => 0.5 - Math.random() - 1); // added -1 to not randomize :)
    return tempArr;
}
