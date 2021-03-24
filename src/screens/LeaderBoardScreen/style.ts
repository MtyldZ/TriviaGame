import {StyleSheet} from 'react-native';
import {rx, screenWidth} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#2ba067',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerAndScoreContainer: {
        flex: 1,
    },
    headerContainer: {
        height: 60 * rx,
        marginTop: 20 * rx,
        alignSelf: 'center',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 32,
        fontFamily: 'sans-serif-condensed',
    },
    buttonsContainer: {
        height: 140 * rx,
        justifyContent: 'space-evenly',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40 * rx,
        width: screenWidth * 0.6,
        backgroundColor: '#17633e',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
    },
});
