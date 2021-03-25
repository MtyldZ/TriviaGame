import {StyleSheet} from 'react-native';
import {rx, screenWidth} from '../../utils/dimensions';
import {Colors} from '../../utils/color';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.startBody,
    },
    logoContainer: {
        width: 220 * rx,
        height: 220 * rx,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 60 * rx,
    },
    logoImage: {
        height: 187.5 * rx,
        width: 187.5 * rx,
        marginBottom: 15 * rx,
    },
    logoText: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: '700',
        fontFamily: 'sans-serif-condensed',
    },
    buttonStyle: {
        marginTop: 20 * rx,
        width: screenWidth * 0.6,
        height: 40 * rx,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f008a',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'sans-serif-condensed',
    },

});
