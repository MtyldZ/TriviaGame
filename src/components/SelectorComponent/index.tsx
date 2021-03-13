import React, {ReactElement, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';


export function SelectorComponent(props: {
    array: string[],
    onChange: (string: string) => any;
}): ReactElement {
    const [selected, setSelected] = useState(props.array[0]);

    return (
        <>
            <View style={Styles.pickerContainer}>
                <Picker
                    selectedValue={selected}
                    style={Styles.pickerContainerIndividual}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelected(itemValue);
                        props.onChange(itemValue);
                    }}
                >
                    {props.array.map(((value, i) =>
                            <Picker.Item label={value} value={value} key={`part_${i}`}/>
                    ))}
                </Picker>
            </View>
        </>
    );
}

const Styles = StyleSheet.create({
    pickerContainer: {
        height: 45,
        width: '80%',
        marginBottom: 15,
        paddingLeft: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 7,
    },
    pickerContainerIndividual: {
        width: '100%',
        height: '100%',
    },
});
