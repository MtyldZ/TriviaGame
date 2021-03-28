import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    questionContainer: {
        height: 175 * rx,
        width: '100%',
        paddingHorizontal: 10 * rx,
    },
    questionTextStyle: {
        color: '#fff',
        fontSize: 36,
        fontFamily: 'sans-serif-condensed',
    },
});
