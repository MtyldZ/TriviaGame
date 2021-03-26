import React, {memo} from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';

type Choice = {
    choiceName: string;
    choiceText: string;
    onPress?: (event: GestureResponderEvent) => void;
}

export const ChoiceComponent = memo((props: Choice) => {
    return (
        <TouchableOpacity style={Styles.choiceContainer} onPress={props.onPress}>
            <Text style={Styles.choiceName}>
                {props.choiceName + ':   '}
            </Text>
            <Text style={Styles.choiceText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}>
                {props.choiceText}
            </Text>
        </TouchableOpacity>
    );
});

