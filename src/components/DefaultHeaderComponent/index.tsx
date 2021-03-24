import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Styles} from './style';
import {useSelector} from 'react-redux';
import {defaultThemes, themeType} from '../../utils/themes';


const DefaultHeaderRowPartComponent = memo((
    props: { firstLine: string; secondLine: string },
) => {
    return (
        <View style={Styles.rowPartContainer}>
            <Text style={Styles.rowPartText}>{props.firstLine}</Text>
            <Text style={Styles.rowPartText}>{props.secondLine}</Text>
        </View>
    );
});

export const DefaultHeaderComponent = memo((props: {
    parts?: { first: string; second: string; }[];
    theme?: themeType
}) => {
    const questionIndex = useSelector(state => state.triviagame.currentQuestionIndex);
    const partsDefault = props.parts || [];
    const color = props.theme || defaultThemes.correct;

    return (
        <View style={[Styles.container, {backgroundColor: color['2']}]}>
            <DefaultHeaderRowPartComponent firstLine={'Question'} secondLine={`${questionIndex}/10`}/>
            {
                partsDefault.map(
                    (value, index) =>
                        <DefaultHeaderRowPartComponent firstLine={value.first} secondLine={value.second}
                                                       key={`key=${index}`}/>,
                )
            }
        </View>
    );
});
