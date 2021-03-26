import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {spendFiftyPercentJokerRightAction} from '../../store/triviaGame/action';
import {Question} from '../../utils/types';

export const FiftyPercentJokerComponent = memo((props: {
        onPress: (strings: string[]) => void
    }) => {
        const dispatch = useDispatch();
        const used = useSelector(state => state.triviaGame.fiftyPercentJokerIsUsed);

        const questionIndex = useSelector(state => state.triviaGame.questionIndex);
        const allQuestions: Question[] = useSelector(state => state.triviaGame.questions);
        const questionObject: Question = allQuestions[questionIndex];

        const pressHandler = () => {
            let i = Math.round(Math.random() * (questionObject.wrongAnswers.length - 1));
            dispatch(spendFiftyPercentJokerRightAction());
            props.onPress([questionObject.wrongAnswers[i], questionObject.correctAnswer]);
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
