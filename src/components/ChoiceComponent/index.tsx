import React, {memo} from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';

export const ChoiceComponent = memo((props: {
    choiceName: string,
    choiceText: string,
    onPress?: (event: GestureResponderEvent) => void;
}) => {
    return (
        <TouchableOpacity style={Styles.choiceContainer} onPress={props.onPress}>
            <Text style={Styles.ChoiceName}>{props.choiceName + ':   '}</Text>
            <Text adjustsFontSizeToFit={true} numberOfLines={2} style={Styles.ChoiceText}>{props.choiceText}</Text>
        </TouchableOpacity>
    );
});

