import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    jokerContainer: {
        marginVertical: 15 * rx,
        borderRadius: 25 * rx,
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
    },
});
