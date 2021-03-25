import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Styles} from './style';
import {useSelector} from 'react-redux';

export type RowPartType = { first: string; second: string; }

const HeaderRowPartComponent = memo((props: RowPartType) => {
    return (
        <View style={Styles.rowPartContainer}>
            <Text style={Styles.rowPartText}>{props.first}</Text>
            <Text style={Styles.rowPartText}>{props.second}</Text>
        </View>
    );
});

export const HeaderComponent = memo((props: { parts?: RowPartType[]; color: string }) => {
    const questionIndex = useSelector(state => state.triviaGame.questionIndex);
    const partsDefault = props.parts || [];
    return (
        <View style={[Styles.container, {backgroundColor: props.color}]}>
            <HeaderRowPartComponent first={'Question'} second={`${questionIndex}/10`}/>
            {
                partsDefault.map(
                    (value, index) =>
                        <HeaderRowPartComponent first={value.first}
                                                       second={value.second}
                                                       key={`key=${index}`}/>,
                )
            }
        </View>
    );
});
