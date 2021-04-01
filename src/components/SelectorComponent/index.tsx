import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Styles} from './style';
import {SelectorListType} from '../../utils/types';

type SelectionType = {
    array: SelectorListType[];
    onChange: (item: SelectorListType) => void;
}

export const SelectorComponent = memo(function SelectorComponent(props: SelectionType) {
    const [selected, setSelected] = useState(props.array[0]);

    const valueChangeHandler = useCallback((itemValue: SelectorListType) => {
        setSelected(itemValue);
        props.onChange(itemValue);
    }, [props]);

    return (
        <View style={Styles.pickerContainer}>
            <Picker style={Styles.pickerContainerIndividual}
                    selectedValue={selected}
                    onValueChange={valueChangeHandler}
            >
                {
                    props.array.map((value, index) =>
                        <Picker.Item label={unescape(value.name)}
                                     fontFamily={'sans-serif-condensed'}
                                     value={value}
                                     key={`part_${index}`}
                        />)
                }
            </Picker>
        </View>
    );
});
