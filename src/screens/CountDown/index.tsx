import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function CountDown(props: {
    timer: number
}): React.ReactElement {

    const [count, setCount] = useState(props.timer);
    console.log('Rendered ', count);

    useEffect(() => {
        const intervalToDecrease = setInterval(() => {
            setCount(prevState => (prevState > 0 ? prevState - 1 : 0));
        }, 1000);
        return () => clearInterval(intervalToDecrease);
    }, [count]);


    return (
        <>
            <View style={Styles.container}>
                <Text style={Styles.count}>{count}</Text>
            </View>
        </>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        fontSize: 64,
        fontWeight: '400',
    },
});
