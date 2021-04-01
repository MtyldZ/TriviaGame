import React, {memo, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {HeaderComponent} from '../../components/HeaderComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/default-styles';
import {Styles} from '../TimeOutScreen/style';
import {BackHandler, View} from 'react-native';
import {StateEnum} from '../../utils/state-enum';
import {ResultBodyComponent} from '../../components/ResultBodyComponent';
import {DisableableButtonComponent} from '../../components/DisableableButtonComponent';

export const VictoryScreen = memo(function VictoryScreen() {
    const navigation = useNavigation();
    const totalPoint = useSelector(state => state.triviaGame.totalPoint);
    const [screenState, setScreenState] = useState(StateEnum.reading);

    const onButtonPress = useCallback(() => {
        if (screenState !== StateEnum.reading) {
            return;
        }
        setScreenState(StateEnum.pressed);
        navigation.goBack();
    }, [navigation, screenState]);

    const hardwareBackPressEventHandler = useCallback(() => {
        onButtonPress();
        return true;
    }, [onButtonPress]);

    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackPressEventHandler);
        return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressEventHandler);
    }, [hardwareBackPressEventHandler]));

    return (
        <>
            <HeaderComponent color={Colors.victoryHeader}/>
            <View style={Styles.container}>
                <ResultBodyComponent
                    image={require('../../assets/icons/victory.png')}
                    textUnderImage={'Victory'}
                    lowerTexts={[
                        'You answered correctly to all Questions',
                        `Total points ${totalPoint.toString()}.`]}/>
                <DisableableButtonComponent
                    onPress={onButtonPress}
                    buttonText={'Main Menu'}
                    color={Colors.victoryButton}
                    isDisabled={screenState !== StateEnum.reading}/>
            </View>
        </>
    );
});
