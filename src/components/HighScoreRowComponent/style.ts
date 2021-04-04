import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {Colors, FontFamily} from '../../utils/default-styles';

const HEIGHT = 50 * rx;

export const Styles = StyleSheet.create({
    highScoreRowContainer: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderWidth: 2 * rx,
        height: HEIGHT,
        width: 380 * rx,
        marginVertical: 10 * rx,
        flexDirection: 'row',
    },
    rowPartContainer: {
        borderWidth: rx,
        borderColor: 'black',
        backgroundColor: Colors.highScoreRowColor,
        height: HEIGHT,
        justifyContent: 'center',
    },
    text: {
        paddingLeft: 4 * rx,
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '400',
        fontFamily: FontFamily.fontFamily,
    },
});
