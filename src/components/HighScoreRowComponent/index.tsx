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
        <View style={[Styles.rowPartContainer, {flex: props.size}]}>
            <Text style={Styles.text} numberOfLines={1}>{props.text}</Text>
        </View>
    );
});

export const HighScoreRowComponent = memo(function HighScoreRowComponent(props: HighScoreRowPartType) {
    const {score, difficulty, category, totalSpentTime} = props;

    return (
        <View style={Styles.highScoreRowContainer}>
            <HighScoresRowPart text={score} size={20}/>
            <HighScoresRowPart text={difficulty} size={20}/>
            <HighScoresRowPart text={category} size={35}/>
            <HighScoresRowPart text={totalSpentTime + ' seconds'} size={25}/>
        </View>
    );
});
