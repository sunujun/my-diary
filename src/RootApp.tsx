import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigation/RootStackNavigation';

export const RootApp = () => {
    return (
        <NavigationContainer>
            <RootStackNavigation />
        </NavigationContainer>
    );
};
