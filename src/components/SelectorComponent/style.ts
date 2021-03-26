import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    pickerContainer: {
        height: 45 * rx,
        width: '80%',
        marginBottom: 15 * rx,
        paddingLeft: 10 * rx,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 7 * rx,
    },
    pickerContainerIndividual: {
        width: '100%',
        height: '100%',
    },
});
