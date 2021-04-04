import React, {memo} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {Styles} from './style';

type PropsLowerComponentType = {
    upperText: string;
    lowerText: string
}

const ResultLowerComponent = memo(function ResultLowerComponent(props: PropsLowerComponentType) {
    const {upperText, lowerText} = props;
    return (
        <View style={Styles.middleViewContainer}>
            <Text style={Styles.smallerText}>
                {upperText}
            </Text>
            <Text style={Styles.smallerText}>
                {lowerText}
            </Text>
        </View>
    );
});


type ResultPropsBodyComponentType = {
    image: ImageSourcePropType;
    title: string;
    otherTexts: string[];
}

export const ResultBodyComponent = memo(function ResultBodyComponent(props: ResultPropsBodyComponentType) {
    const {image, title, otherTexts} = props;
    return (
        <>
            <Image source={image} style={Styles.imageStyle}/>
            <Text style={Styles.biggerText}>{title}</Text>
            <ResultLowerComponent upperText={otherTexts[0]} lowerText={otherTexts[1]}/>
        </>
    );
});
