import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#7b00e9',
    },
    moreHeader: {
        backgroundColor: '#4a008b',
    },
    midQuestionContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    midQuestionText: {
        color: '#fff',
        fontSize: 38,
    },
    middleText: {
        color: '#fff',
        fontSize: 32,
    },
    lowerText: {
        fontSize: 22,
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    FiftyPercentJokerContainer: {flexDirection: 'row', width: '95%', justifyContent: 'flex-start'},
});
