import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {useFiftyPercentJokerAction} from '../../store/triviagame/action';
import {Question} from '../../@types/types';

export const FiftyPercentJokerComponent = memo((props: {
        onPress?: (strings: string[]) => void;
    }) => {
        const dispatch = useDispatch();
        const used = useSelector(state => state.triviagame.fiftyPercentJokerIsUsed);
        const onPress = props.onPress || (() => console.log('DefaultButtonPressed, something went Wrong'));

        const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
        const allQuestions: Question[] = useSelector(state => state.triviagame.allQuestions);
        const questionObject: Question = allQuestions[questionIndex];

        const pressHandler = () => {
            let i = Math.round(Math.random() * (questionObject.wrong_answers.length - 1));
            return [questionObject.wrong_answers[i], questionObject.correct_answer];
        };

        return (
            <>
                {renderIf(!used)(() =>
                    <TouchableOpacity style={Styles.fiftyPercentJokerContainer}
                                      onPress={() => {
                                          dispatch(useFiftyPercentJokerAction());
                                          onPress(pressHandler());
                                      }}>
                        <Text style={Styles.fiftyPercentJokerText}>
                            %50
                        </Text>
                    </TouchableOpacity>,
                )}
            </>
        );
    },
);
