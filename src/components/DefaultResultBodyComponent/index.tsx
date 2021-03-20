import React, {memo} from 'react';
import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from './style';
import {defaultThemes, themeType} from '../../utils/themes';
import {useSelector} from 'react-redux';


export const DefaultResultBodyComponent = memo((
    props: {
        theme?: themeType;
        onPress?: (event: GestureResponderEvent) => void;
    },
) => {
    const theme = props.theme || defaultThemes.correct;
    const onPress = props.onPress || (() => console.log('DefaultButtonPressed, something went Wrong'));

    const earnedPoint = useSelector(state => state.triviagame.earnedPointFromLastQuestion);
    const totalPoint = useSelector(state => state.triviagame.currentTotalPoint);

    return (
        <View style={[Styles.container, {backgroundColor: theme['1']}]}>
            <Image source={theme.image} style={Styles.imageStyle}/>
            <Text style={Styles.biggerText}>{theme.t1}</Text>

            <View style={Styles.middleViewContainer}>
                <Text style={Styles.smallerText}>{theme.t2.replace(/%%%/g, earnedPoint + '')}</Text>
                <Text style={Styles.smallerText}>{theme.t3.replace(/%%%/g, totalPoint + '')}</Text>
            </View>

            <TouchableOpacity style={[Styles.buttonContainer, {backgroundColor: theme['2']}]}
                              onPress={onPress}>
                <Text style={Styles.smallerText}>{theme.t4}</Text>
            </TouchableOpacity>
        </View>

    );
});
