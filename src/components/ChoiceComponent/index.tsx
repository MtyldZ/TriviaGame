import React, {memo} from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {textReplace} from '../../utils/replace-text';

export type Choice = {
    choiceName: string;
    choiceText: string;
    onPress?: (event: GestureResponderEvent) => void;
    disabled: boolean;
}

export const ChoiceComponent = memo((props: Choice) => {
    return (
        <TouchableOpacity style={[Styles.choiceContainer,
            (props.disabled ? Styles.disabled : {})]}
                          disabled={props.disabled}
                          onPress={props.onPress}>
            <Text style={Styles.choiceName}>
                {props.choiceName + ':   '}
            </Text>
            <Text style={Styles.choiceText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}>
                {textReplace(props.choiceText)}
            </Text>
        </TouchableOpacity>
    );
});

