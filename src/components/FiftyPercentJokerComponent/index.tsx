import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {spendFiftyPercentJokerRightAction} from '../../store/triviaGame/action';
import {Question} from '../../@types/types';

export const FiftyPercentJokerComponent = memo((props: {
        onPress?: (strings: string[]) => void
    }) => {
        const dispatch = useDispatch();
        const used = useSelector(state => state.triviaGame.fiftyPercentJokerIsUsed);
        const onPress = props.onPress || (() => console.log('DefaultButtonPressed, something went Wrong'));

        const questionIndex = useSelector(state => state.triviaGame.questionIndex);
        const allQuestions: Question[] = useSelector(state => state.triviaGame.questions);
        const questionObject: Question = allQuestions[questionIndex];

        const pressHandler = () => {
            let i = Math.round(Math.random() * (questionObject.wrong_answers.length - 1));
            dispatch(spendFiftyPercentJokerRightAction());
            onPress([questionObject.wrong_answers[i], questionObject.correct_answer]);
        };
        return (
            <>
                {
                    renderIf(!used)(() =>
                        <TouchableOpacity style={Styles.jokerContainer} onPress={pressHandler}>
                            <Text style={Styles.fiftyPercentJokerText}>%50</Text>
                        </TouchableOpacity>)
                }
            </>
        );
    },
);
