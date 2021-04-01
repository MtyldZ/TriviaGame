import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {FontFamily} from '../../utils/default-styles';

export const Styles = StyleSheet.create({
    imageStyle: {
        width: rx * 160,
        height: rx * 160,
        margin: rx * 30,
        marginTop: rx * 70,
    },
    biggerText: {
        color: '#ffffff',
        fontSize: 32,
        fontFamily: FontFamily.fontFamily,
    },
    middleViewContainer: {
        alignItems: 'center',
        marginVertical: rx * 60,
    },
    smallerText: {
        color: '#ffffff',
        fontSize: 22,
        fontFamily: FontFamily.fontFamily,
    },
});
