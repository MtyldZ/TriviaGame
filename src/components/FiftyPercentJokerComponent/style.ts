import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {FontFamily} from '../../utils/default-styles';

export const Styles = StyleSheet.create({
    jokerContainer: {
        marginVertical: 15 * rx,
        borderRadius: 20,
        borderColor: '#ffffff',
        borderWidth: 1.4 * rx,
        height: 65 * rx,
        width: 65 * rx,
        backgroundColor: '#4a0089',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fiftyPercentJokerText: {
        fontSize: 18,
        color: 'white',
        fontFamily: FontFamily.fontFamily,
    },
    disabled: {
        opacity: 0.5,
        backgroundColor: '#00000070',
    },
});
