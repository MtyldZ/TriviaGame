import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {spendFiftyPercentJokerRightAction} from '../../store/triviaGame/action';
import {Question} from '../../utils/types';

type Props = {
    onPress: (choicesThoseWillStayEnabled: string[]) => void;
};

export const FiftyPercentJokerComponent = memo(function FiftyPercentJokerComponent(props: Props) {
        const dispatch = useDispatch();
        const used = useSelector(state => state.triviaGame.isJokerUsed);

        const questionIndex = useSelector(state => state.triviaGame.questionIndex);
        const allQuestions: Question[] = useSelector(state => state.triviaGame.questionList);
        const questionObject: Question = allQuestions[questionIndex];

        const pressHandler = () => {
            let i = Math.round(Math.random() * (questionObject.wrongAnswers.length - 1));
            dispatch(spendFiftyPercentJokerRightAction());
            props.onPress([questionObject.wrongAnswers[i], questionObject.correctAnswer]);
        };
        return (
            <>
                <TouchableOpacity style={[Styles.jokerContainer,
                    (used ? Styles.disabled : {})]}
                                  onPress={pressHandler}
                                  disabled={used}
                >
                    <Text style={Styles.fiftyPercentJokerText}>%50</Text>
                </TouchableOpacity>
            </>
        );
    },
);
