import {StyleSheet} from 'react-native';
import {defaultThemes} from '../../utils/themes';
import {rx, screenWidth} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: defaultThemes.start['1'],
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
