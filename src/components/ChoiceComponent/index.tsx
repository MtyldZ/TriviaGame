import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';

export type Choice = {
    choiceName: string;
    choiceText: string;
    onPress?: () => void;
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
                {props.choiceText}
            </Text>
        </TouchableOpacity>
    );
});

