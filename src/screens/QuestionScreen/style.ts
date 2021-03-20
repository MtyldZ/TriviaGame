import {StyleSheet} from 'react-native';
import {rx, screenWidth} from '../../utils/dimensions';
import {defaultThemes} from '../../utils/themes';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: defaultThemes.question['1'],
    },
    questionContainer: {
        height: 175 * rx,
        width: screenWidth,
        paddingHorizontal: 10 * rx,
    },
    bodyPartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionTextStyle: {
        color: '#fff',
        fontSize: 36,
        fontFamily: 'sans-serif-condensed',
    },
    FiftyPercentJokerContainer: {
        flexDirection: 'row',
        width: screenWidth * 0.9,
        justifyContent: 'flex-start',
    },
});
