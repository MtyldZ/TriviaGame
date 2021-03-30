import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {Colors, FontFamily} from '../../utils/default-styles';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.victoryBody,
    },
    imageStyle: {
        width: rx * 160,
        height: rx * 160,
        margin: rx * 30,
        marginTop: rx * 70,
    },
    biggerText: {
        color: '#ffffff',
        fontSize: 32,
        fontFamily: FontFamily.fontFamily,
    },
    middleViewContainer: {
        alignItems: 'center',
        marginVertical: 60 * rx,
    },
    smallerText: {
        color: '#ffffff',
        fontSize: 22,
        fontFamily: FontFamily.fontFamily,
    },
    buttonStyle: {
        width: 360 * rx,
        height: 70 * rx,
        marginVertical: 65 * rx,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.victoryButton,
    },
});
