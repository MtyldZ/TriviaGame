import React from 'react';
import {IndicatorView} from './components/IndicatorView';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ApplicationNavigator} from './navigators/application.navigator';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './store';

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

export function App() {
    return (
        <Provider store={store}>
            <AppComponent/>
        </Provider>
    );
}
