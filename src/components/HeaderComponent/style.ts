import {StyleSheet} from 'react-native';
import {rx, screenWidth} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: rx * 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },
    rowPartContainer: {
        marginVertical: rx * 10,
        marginHorizontal: rx * 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowPartText: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'sans-serif-condensed',
    },
});
