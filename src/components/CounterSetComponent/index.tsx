import {Button, TextInput, View} from 'react-native';
import {Styles} from './style';
import React, {useState} from 'react';
import {CounterApiService} from '../../api/services/counter-api.service';
import {useUIActions} from '../../store/ui/hooks';
import {useCountActions} from '../../store/count/hooks';

export function CounterSetComponent() {
    const setBusy = useUIActions(actions => actions.changeBusyAction);
    const setNewCount = useCountActions(actions => actions.setCountAction);
    const [currentCountString, setCurrentCountString] = useState<string>(null);

    function onSetPress() {
        const newCountString = currentCountString;
        if (newCountString == null || newCountString.length === 0) {
            return;
        }

        const newCount = parseInt(newCountString, 10);
        if (isNaN(newCount)) {
            return;
        }

        setBusy(true);
        CounterApiService.get()
            .then(() => {
                setNewCount(newCount);
                setCurrentCountString(null);
            })
            .finally(() => setBusy(false));
    }

    return (
        <View style={Styles.container}>
            <TextInput
                style={Styles.textInput}
                value={currentCountString}
                onChangeText={setCurrentCountString}
                keyboardType="numeric"/>
            <Button title="SET" onPress={onSetPress}/>
        </View>
    );
}
