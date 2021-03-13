import React from 'react';
import {Image, StyleProp, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export function BodyResultScreen(props: {
    iconSource: any;
    moreStyle: StyleProp<any>,
    moreStyleForIcon: StyleProp<any>
    text1: string,
    text2: string,
    text3: string,
    buttonText: string,
    moreStyleForButton: StyleProp<any>,
    onButtonPress: () => any
}): React.ReactElement {
    return (
        <>
            <View style={[Styles.container, props.moreStyle]}>
                <Image source={props.iconSource} style={[Styles.icon, props.moreStyleForIcon]}/>
                <Text style={Styles.middleText}>{props.text1}</Text>

                <View style={{alignItems: 'center', marginTop: 60}}>
                    <Text style={[Styles.middleText, Styles.lowerText]}>{props.text2}</Text>
                    <Text style={[Styles.middleText, Styles.lowerText]}>{props.text3}</Text>
                </View>
                <TouchableOpacity style={[Styles.moreStyleButton, props.moreStyleForButton]}
                                  onPress={() => props.onButtonPress()}>
                    <Text style={Styles.ChoiceName}>{props.buttonText}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    moreStyleButton: {
        width: '95%',
        height: 60,
        marginVertical: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a0002c',
    },
    ChoiceName: {
        color: '#fff',
        fontSize: 22,
    },
    icon: {
        width: 125,
        height: 125,
        margin: 30,
        marginTop: 70,
    },
    middleText: {
        color: '#fff',
        fontSize: 32,
    },
    lowerText: {
        fontSize: 22,
    },
});
