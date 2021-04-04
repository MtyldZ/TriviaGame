import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Styles} from './style';
import {SelectorListType} from '../../utils/types';

type SelectionType<T> = {
    optionList: SelectorListType<T>[];
    onChange: (item: SelectorListType<T>) => void;
}

const typedMemo: <T>(c: T) => T = memo;
export const SelectorComponent = typedMemo(function SelectorComponent<T>(props: SelectionType<T>) {
    const [selected, setSelected] = useState(props.optionList[0]);

    const valueChangeHandler = useCallback((itemValue: SelectorListType<T>) => {
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
                    props.optionList.map((value, index) =>
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
