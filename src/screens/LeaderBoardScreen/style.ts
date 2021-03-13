import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#5400e5',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerAndScoreContainer: {flex: 1},
    headerContainer: {height: 60, marginTop: 20, alignSelf: 'center'},
    headerText: {color: '#fff', fontWeight: 'bold', fontSize: 32},

    scoreDescriptionContainer: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        height: 50,
        width: '95%',
        marginTop: 30,
        marginBottom: 10,
        flexDirection: 'row',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '60%',
        backgroundColor: '#2e0089',
        marginBottom: 20,
    },
    buttonContainerText: {color: '#fff', fontSize: 24, fontWeight: 'bold'},
});
