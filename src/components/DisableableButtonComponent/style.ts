import {StyleSheet} from 'react-native';
import {FontFamily} from '../../utils/default-styles';
import {rx} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    smallerText: {
        color: '#ffffff',
        fontSize: 22,
        fontFamily: FontFamily.fontFamily,
    },
    buttonStyle: {
        width: 360 * rx,
        height: 70 * rx,
        marginVertical: 65 * rx,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
