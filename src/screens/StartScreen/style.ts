import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5300e6',
    },
    logoContainer: {
        width: 200,
        height: 220,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 50,
    },
    logoImage: {
        height: 187.5,
        width: 187.5,
        marginBottom: 15,
    },
    logoText: {color: '#c4c4ff', fontSize: 28, fontWeight: '700'},

    textContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
        width: '100%',
    },
    buttonContainer: {
        marginTop: 20,
        width: '60%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f008a',
    },
    buttonText: {color: '#fff', fontSize: 18, fontWeight: '200'},

});
