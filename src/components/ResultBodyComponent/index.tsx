import React, {memo} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {Styles} from './style';

type PropsLowerComponentType = {
    upperText: string;
    lowerText: string
}

const ResultLowerComponent = memo(function ResultLowerComponent(props: PropsLowerComponentType) {
    return (
        <View style={Styles.middleViewContainer}>
            <Text style={Styles.smallerText}>
                {props.upperText}
            </Text>
            <Text style={Styles.smallerText}>
                {props.lowerText}
            </Text>
        </View>
    );
});


type ResultPropsBodyComponentType = {
    image: ImageSourcePropType;
    textUnderImage: string;
    lowerTexts: string[];
}

export const ResultBodyComponent = memo(function ResultBodyComponent(props: ResultPropsBodyComponentType) {
    return (
        <>
            <Image source={props.image} style={Styles.imageStyle}/>
            <Text style={Styles.biggerText}>{props.textUnderImage}</Text>
            <ResultLowerComponent upperText={props.lowerTexts[0]} lowerText={props.lowerTexts[1]}/>
        </>
    );
});
