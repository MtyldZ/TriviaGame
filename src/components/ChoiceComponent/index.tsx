import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {Choice} from '../../@types/types';

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

