import {StyleSheet} from 'react-native';
import {FontFamily} from '../../utils/default-styles';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 24,
        fontFamily: FontFamily.fontFamily,
        textAlign: 'center',
    },
});
