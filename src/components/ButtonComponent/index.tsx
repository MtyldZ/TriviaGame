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
    const {color, onPress, isDisabled, buttonText} = props;

    return (
        <TouchableOpacity
            style={[
                Styles.buttonStyle,
                {backgroundColor: (color || '#fff')}]}
            onPress={onPress}
            disabled={isDisabled || false}>
            <Text style={Styles.smallerText}>
                {buttonText || 'DefaultButtonText'}
            </Text>
        </TouchableOpacity>
    );
});
