import {StyleSheet} from 'react-native';
import {rx, screenHeight, screenWidth} from '../../utils/dimensions';

export const Styles = StyleSheet.create({
    container: {
        height: screenHeight - rx * 110,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    middleViewContainer: {
        alignItems: 'center',
        marginVertical: rx * 60,
    },
    smallerText: {
        color: '#ffffff',
        fontSize: 22,
    },
    buttonContainer: {
        width: screenWidth * 0.9,
        height: rx * 70,
        marginVertical: rx * 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
