import {StyleSheet} from 'react-native';
import {rx} from '../../utils/dimensions';
import {Colors} from '../../utils/color';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.correctBody,
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
    buttonStyle: {
        width: '90%',
        height: rx * 70,
        marginVertical: rx * 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.correctButton,
    },
});
