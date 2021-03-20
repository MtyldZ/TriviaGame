import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';

export function ChoiceComponent(props: {
    choiceName: string,
    choiceText: string,
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity style={Styles.choiceContainer} onPress={() => props.onPress()}>
            <Text style={Styles.ChoiceName}>{props.choiceName + ':   '}</Text>
            <Text adjustsFontSizeToFit={true} numberOfLines={2} style={Styles.ChoiceText}>{props.choiceText}</Text>
        </TouchableOpacity>
    );
}

