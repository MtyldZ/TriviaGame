import React, {useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Styles} from './style';
import {textReplace} from '../../utils/rePlaceText';


export function SelectorComponent(
    props: {
        array: string[],
        onChange: (string: string) => any;
    }) {
    const [selected, setSelected] = useState(props.array[0]);

    return (
        <>
            <View style={Styles.pickerContainer}>
                <Picker
                    selectedValue={selected}
                    style={Styles.pickerContainerIndividual}
                    onValueChange={(itemValue) => {
                        setSelected(itemValue);
                        props.onChange(itemValue);
                    }}
                >
                    {props.array.map(((value, i) =>
                            <Picker.Item label={textReplace(value)} value={value} key={`part_${i}`}/>
                    ))}
                </Picker>
            </View>
        </>
    );
}


