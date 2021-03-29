import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#2ba067',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10 * rx,
    },
    headerAndScoreContainer: {
        flex: 1,
    },
    headerContainer: {
        height: 60 * rx,
        marginTop: 10 * rx,
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
        height: 50 * rx,
        width: 256 * rx,
        backgroundColor: '#17633e',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
    },
});
