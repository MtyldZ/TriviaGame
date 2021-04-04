import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {FontFamily} from '../../utils/default-styles';

export const Styles = StyleSheet.create({
    container: {
        width: '100%',
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
    text: {
        color: 'white',
        fontSize: 22,
        fontFamily: FontFamily.fontFamily,
    },
});
