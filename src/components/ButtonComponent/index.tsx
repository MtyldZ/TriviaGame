import React, {memo} from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';

type Props = {
    color?: string;
    onPress?: (event: GestureResponderEvent) => void;
    isDisabled?: boolean;
    buttonText?: string;
}

export const ButtonComponent = memo(function ButtonComponent(props: Props) {
    return (
        <>
            <TouchableOpacity style={[Styles.buttonStyle, {backgroundColor: (props.color || '#fff')}]}
                              onPress={props.onPress}
                              disabled={props.isDisabled || false}>
                <Text style={Styles.smallerText}>{props.buttonText || 'DefaultButtonText'}</Text>
            </TouchableOpacity>
        </>
    );
});
