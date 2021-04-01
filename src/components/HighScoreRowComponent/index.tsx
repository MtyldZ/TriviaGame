import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Styles} from './style';
import {HighScoreRowPartType} from '../../utils/types';

type PartProps = {
    text: string;
    size: number;
}

const HighScoresRowPart = memo(function HighScoresRowPart(props: PartProps) {
    return (
        <View style={[Styles.rowPartContainer, {width: `${props.size}%`}]}>
            <Text style={Styles.rowPartText} numberOfLines={1}>{props.text}</Text>
        </View>
    );
});

export const HighScoreRowComponent = memo(function HighScoreRowComponent(props: HighScoreRowPartType) {
    return (
        <View style={Styles.highScoreRowContainer}>
            <HighScoresRowPart text={props.score} size={20}/>
            <HighScoresRowPart text={props.difficulty} size={20}/>
            <HighScoresRowPart text={props.category} size={35}/>
            <HighScoresRowPart text={props.totalSpentTime + ' seconds'} size={25}/>
        </View>
    );
});
