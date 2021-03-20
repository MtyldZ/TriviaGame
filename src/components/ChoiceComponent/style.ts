import {StyleSheet} from 'react-native';
import {rx, screenWidth} from '../../utils/dimensions';
import {defaultThemes} from '../../utils/themes';

export const Styles = StyleSheet.create({
    choiceContainer: {
        alignItems: 'center',
        backgroundColor: defaultThemes.question['2'],
        flexDirection: 'row',
        height: 65 * rx,
        justifyContent: 'flex-start',
        marginVertical: 5 * rx,
        paddingLeft: 20 * rx,
        paddingRight: 30 * rx,
        width: screenWidth * 0.95,
    },
    ChoiceName: {
        color: '#fff',
        fontSize: 20,
    },
    ChoiceText: {
        color: '#fff',
        fontSize: 26,
        fontFamily: 'sans-serif-condensed',
    },
});
