import React, {ReactElement} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';

export function Choice(props: {
    choiceName: string,
    choiceText: string,
    onPress: () => any
}): ReactElement {
    return (
        <TouchableOpacity style={Styles.Choice} onPress={() => props.onPress()}>
            <Text style={Styles.ChoiceName}>{props.choiceName + ':   '}</Text>
            <Text style={Styles.ChoiceText}>{props.choiceText}</Text>
        </TouchableOpacity>
    );
}

