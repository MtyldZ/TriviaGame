import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Styles} from './style';
import {useSelector} from 'react-redux';

export type RowPartType = {
    firstLine: string;
    secondLine: string;
}

const HeaderRowPartComponent = memo(function HeaderRowPartComponent(props: RowPartType) {
    const {firstLine, secondLine} = props;
    return (
        <View style={Styles.rowPartContainer}>
            <Text style={Styles.text}>{firstLine}</Text>
            <Text style={Styles.text}>{secondLine}</Text>
        </View>
    );
});

type HeaderType = {
    parts?: RowPartType[];
    color: string;
}

export const HeaderComponent = memo(function HeaderComponent(props: HeaderType) {
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const {parts, color} = props;
    const partsDefault = parts || [];

    return (
        <View style={[Styles.container, {backgroundColor: color}]}>
            <HeaderRowPartComponent firstLine={'Question'} secondLine={`${questionIndex + 1}/10`}/>
            {
                partsDefault.map((value, index) =>
                    <HeaderRowPartComponent firstLine={value.firstLine}
                                            secondLine={value.secondLine}
                                            key={`key=${index}`}/>,
                )
            }
        </View>
    );
});
