import {ActivityIndicator, View} from 'react-native';
import {Style} from './style';
import React, {memo, PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';

export const IndicatorView = memo(function IndicatorView(props: PropsWithChildren<{}>) {
    const busy = useSelector(state => state.ui.busy);
    return (
        <>
            {props.children}
            {
                renderIf(busy)(() => <View style={Style.container} key="indicator">
                        <ActivityIndicator size={'large'} color={'red'}/>
                    </View>,
                )
            }
        </>
    );
});
