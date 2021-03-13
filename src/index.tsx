import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from './store';
import {IndicatorView} from './components/IndicatorView';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ApplicationNavigator} from './navigators/application.navigator';
import 'react-native-gesture-handler';

import {LeaderBoardScreen} from './screens/LeaderBoardScreen';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(255,255,255)',
    },
};

function AppComponent() {
    return (
        <IndicatorView>
            <NavigationContainer theme={theme}>
                <ApplicationNavigator/>
            </NavigationContainer>
        </IndicatorView>
    );
}

export function App(): React.ReactElement {
    return (
        <Provider store={store}>
            <AppComponent/>
        </Provider>
    );
}
