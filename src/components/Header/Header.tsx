import React, {ReactElement} from 'react';
import {StyleProp, StyleSheet, Text, View} from 'react-native';

type HeaderPartInfo = { text: string, text2: string, text2style: StyleProp<any> }


function HeaderPart(props: {
    info: HeaderPartInfo
}): ReactElement {
    return (
        <View style={Styles.headerParts}>
            <Text style={Styles.headerPartsText}>{props.info.text}</Text>
            <Text style={[Styles.headerPartsText, props.info.text2style]}>{props.info.text2}</Text>
        </View>
    );
}


export function Header(props: {
    moreStyle: StyleProp<any>,
    parts: HeaderPartInfo[]
}): ReactElement {

    return (
        <View style={[Styles.moreHeader, props.moreStyle]}>
            {props.parts.map((part, i) => (
                <HeaderPart info={part} key={`part_${i}`}/>
            ))}
        </View>
    );
}

const Styles = StyleSheet.create({
    moreHeader: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'flex-start',
        backgroundColor: '#006d35',
    },
    headerParts: {
        marginHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerPartsText: {
        color: 'white', fontSize: 20,
    },
});
