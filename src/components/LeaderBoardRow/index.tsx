import React from 'react';
import {Text, View} from 'react-native';
import {Styles} from './style';
import {UserScore} from '../../@types/types';

export function LeaderBoardRowPart(props: {
    text: string,
    size: number
}) {
    return (
        <View style={[Styles.viewPart, {width: `${props.size}%`}]}>
            <Text style={Styles.text} numberOfLines={1}>
                {props.text}
            </Text>
        </View>
    );
}

export function LeaderBoardRow(props: { userScore: UserScore }): React.ReactElement {
    return (
        <>
            <View style={Styles.view_view}>
                <LeaderBoardRowPart text={props.userScore.score + ''} size={15}/>
                <LeaderBoardRowPart text={props.userScore.difficulty + ''} size={20}/>
                <LeaderBoardRowPart text={props.userScore.category + ''} size={40}/>
                <LeaderBoardRowPart text={props.userScore.totalTimeSpent + ' seconds'} size={25}/>
            </View>
        </>
    );
}

