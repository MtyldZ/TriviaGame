import React, {memo} from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';

export type Choice = {
    choiceName: string;
    choiceText: string;
    disabled: boolean;
}

type ChoiceComponentType = {
    choice: Choice;
    onPress?: (event: GestureResponderEvent) => void;
};

export const ChoiceComponent = memo(function ChoiceComponent(props: ChoiceComponentType) {
    return (
        <TouchableOpacity style={[Styles.choiceContainer,
            (props.choice.disabled ? Styles.disabled : {})]}
                          disabled={props.choice.disabled}
                          onPress={props.onPress}>
            <Text style={Styles.choiceName}>
                {props.choice.choiceName + ':   '}
            </Text>
            <Text style={Styles.choiceText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}>
                {props.choice.choiceText}
            </Text>
        </TouchableOpacity>
    );
});

