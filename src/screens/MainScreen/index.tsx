import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Styles} from './style';
import {CounterComponent} from '../../components/CounterComponent';
import {CounterSetComponent} from '../../components/CounterSetComponent';

export function MainScreen() {
    return (
        <KeyboardAvoidingView
            style={Styles.keyboardAvoidingView}
            behavior={Platform.select<'height' | 'position' | 'padding'>({
                android: undefined,
                ios: 'padding',
            })}>
            <ScrollView
                contentContainerStyle={Styles.scrollView}>
                <View style={Styles.container}>
                    <CounterComponent/>
                    <CounterSetComponent/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
