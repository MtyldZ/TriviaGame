import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {Colors} from '../../utils/color';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: Colors.questionBody,
    },
    questionContainer: {
        height: 175 * rx,
        width: '100%',
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
    jokerContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-start',
    },
});
