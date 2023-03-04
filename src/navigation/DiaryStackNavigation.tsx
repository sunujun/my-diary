import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DiaryDetailScreen } from '../screens/DiaryDetailScreen';
import { DiaryListScreen } from '../screens/DiaryListScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export const DiaryStackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="DiaryList"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="DiaryList" component={DiaryListScreen} />
            <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};
