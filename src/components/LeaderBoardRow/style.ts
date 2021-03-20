import {StyleSheet} from 'react-native';
import {rx, screenWidth} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    LeaderBoardRowContainer: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: rx,
        height: 50 * rx,
        width: screenWidth * 0.95,
        marginVertical: 10,
        flexDirection: 'row',
    },
    leaderBoardRowPartContainer: {
        paddingLeft: 2 * rx,
        borderWidth: rx,
        borderColor: 'black',
        backgroundColor: '#17633e',
        height: '100%',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '700',
        fontFamily: 'sans-serif-condensed',
    },
});
