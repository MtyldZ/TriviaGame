import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/color';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: Colors.questionBody,
    },
    bodyPartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    jokerContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-start',
    },
});
