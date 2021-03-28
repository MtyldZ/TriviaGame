import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {Colors} from '../../utils/color';

export const Styles = StyleSheet.create({
    highScoreRowContainer: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: rx,
        height: 50 * rx,
        width: '95%',
        marginVertical: 10 * rx,
        flexDirection: 'row',
    },
    rowPartContainer: {
        paddingLeft: 2 * rx,
        borderWidth: rx,
        borderColor: 'black',
        backgroundColor: Colors.highScoreRowColor,
        height: '100%',
        justifyContent: 'center',
    },
    rowPartText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '400',
        fontFamily: 'sans-serif-condensed',
    },
});
