import React, {memo, useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Styles} from './style';
import {textReplace} from '../../utils/replace-text';

export const SelectorComponent = memo((props: { array: string[], onChange: (string: string) => any }) => {
    const [selected, setSelected] = useState(props.array[0]);

    return (
        <View style={Styles.pickerContainer}>
            <Picker style={Styles.pickerContainerIndividual}
                    selectedValue={selected}
                    onValueChange={(itemValue: string) => {
                        setSelected(itemValue);
                        props.onChange(itemValue);
                    }
                    }>
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
