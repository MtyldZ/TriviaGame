import React, {memo} from 'react';
import {Question} from '../../utils/types';
import {rx} from '../../utils/dimensions';
import {Text, View} from 'react-native';
import {textReplace} from '../../utils/replace-text';
import {Styles} from './styles';

export const QuestionTextPartComponent = memo((props: { questionObject: Question }) => {
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
