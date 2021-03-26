import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Styles} from './style';
import {textReplace} from '../../utils/replace-text';

type SelectionType = {
    array: string[];
    onChange: (string: string) => void;
}

export const SelectorComponent = memo((props: SelectionType) => {
    const [selected, setSelected] = useState(props.array[0]);

    const valueChangeHandler = useCallback((itemValue: string) => {
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
                        <Picker.Item label={textReplace(value)}
                                     fontFamily={'sans-serif-condensed'}
                                     value={value}
                                     key={`part_${index}`}
                        />)
                }
            </Picker>
        </View>
    );
});
