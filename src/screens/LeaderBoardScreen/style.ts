import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#bf6ac2',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    view_view: {
        flex: 1,
    },
    view_view_header: {
        height: 60,
        marginTop: 20, alignSelf: 'center',
    },
    view_view_header_text: {
        color: '#fff', fontWeight: 'bold', fontSize: 32,
    },
    view_view_view: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        height: 50,
        width: '95%',
        marginTop: 30,
        marginBottom: 10,
        flexDirection: 'row',
    },
    view_touchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '60%',
        backgroundColor: '#b92abf',
        // borderColor: '#000',
        // borderWidth: 2,
        marginBottom: 20,
    },
    view_touchableOpacity_text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
