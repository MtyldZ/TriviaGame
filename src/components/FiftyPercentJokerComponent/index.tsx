import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {useFiftyPercentJokerAction} from '../../store/triviagame/action';

export function FiftyPercentJokerComponent(props: {
    onPress(): any;
}) {
    const dispatch = useDispatch();
    const used = useSelector(state => state.triviagame.fiftyPercentJokerIsUsed);

    return (
        <>
            {renderIf(!used)(() =>
                <TouchableOpacity style={Styles.fiftyPercentJokerContainer}
                                  onPress={() => {
                                      dispatch(useFiftyPercentJokerAction());
                                      props.onPress();
                                  }}>
                    <Text style={Styles.fiftyPercentJokerText}>
                        %50
                    </Text>
                </TouchableOpacity>,
            )}
        </>
    );
}
