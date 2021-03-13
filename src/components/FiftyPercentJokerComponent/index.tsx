import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {useFiftyPercentJokerAction} from '../../store/triviagame/action';

export function FiftyPercentJokerComponent(props: {
    onPress(): any;
}): React.ReactElement {
    const dispatch = useDispatch();
    const used = useSelector(state => state.triviagame.fiftyPercentJokerIsUsed);

    return (
        <>
            {renderIf(!used)(() =>
                <TouchableOpacity style={Styles.view_touchableOpacity} onPress={() => {
                    dispatch(useFiftyPercentJokerAction());
                    props.onPress();
                }}>
                    <Text style={Styles.touchableOpacityText}>
                        %50
                    </Text>
                </TouchableOpacity>,
            )}
        </>
    );
}
