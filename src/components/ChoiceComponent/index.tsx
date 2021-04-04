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
    const {choice, onPress} = props;
    const {choiceName, choiceText, disabled} = choice;

    return (
        <TouchableOpacity
            style={[Styles.choiceContainer,
                (disabled ? Styles.disabled : {})]}
            disabled={disabled}
            onPress={onPress}>
            <Text style={Styles.choiceName}>
                {choiceName + ':   '}
            </Text>
            <Text style={Styles.choiceText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}>
                {choiceText}
            </Text>
        </TouchableOpacity>
    );
});

