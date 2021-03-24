import {Styles} from './style';
import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useCountActions} from '../../store/count#/hooks';

export function CounterComponent() {
    const currentCount = useSelector(state => state.counter.currentCount);
    const plusPress = useCountActions(actions => actions.incrementCountAction);
    const minusPress = useCountActions(actions => actions.decrementCountAction);

    const currentCountString = currentCount.toString();

    return (
        <View style={Styles.container}>
            <TouchableOpacity
                onPress={minusPress}>
                <View style={Styles.buttonTextContainer}>
                    <Text style={Styles.ChoiceName}>
                        -
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={Styles.middleTextContainer}>
                <Text style={Styles.middleText}>
                    {currentCountString}
                </Text>
            </View>
            <TouchableOpacity
                onPress={plusPress}>
                <View style={Styles.buttonTextContainer}>
                    <Text style={Styles.ChoiceName}>
                        +
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
