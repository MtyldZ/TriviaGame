import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {Colors, FontFamily} from '../../utils/default-styles';

export const Styles = StyleSheet.create({
    choiceContainer: {
        alignItems: 'center',
        backgroundColor: Colors.questionButton,
        flexDirection: 'row',
        height: 65 * rx,
        justifyContent: 'flex-start',
        marginVertical: 5 * rx,
        paddingLeft: 20 * rx,
        paddingRight: 30 * rx,
        width: '95%',
    },
    choiceName: {
        color: '#fff',
        fontSize: 20,
        fontFamily: FontFamily.fontFamily,
    },
    choiceText: {
        color: '#fff',
        fontSize: 26,
        fontFamily: FontFamily.fontFamily,
    },
    disabled: {
        opacity: 0.5,
        backgroundColor: '#00000070',
    },
});
