import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Styles} from './style';
import {HighScoreRowPartType} from '../../utils/types';

type PartProps = {
    text: string;
    size: number;
}

const HighScoresRowPart = memo((props: PartProps) => {
    return (
        <View style={[Styles.rowPartContainer, {width: `${props.size}%`}]}>
            <Text style={Styles.rowPartText} numberOfLines={1}>{props.text}</Text>
        </View>
    );
});

export const HighScoreRowComponent = memo((props: HighScoreRowPartType) => {
    return (
        <View style={Styles.highScoreRowContainer}>
            <HighScoresRowPart text={props.text1} size={20}/>
            <HighScoresRowPart text={props.text2} size={20}/>
            <HighScoresRowPart text={props.text3} size={35}/>
            <HighScoresRowPart text={props.text4 + ' seconds'} size={25}/>
        </View>
    );
});
