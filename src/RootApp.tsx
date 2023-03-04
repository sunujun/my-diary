import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigation/RootStackNavigation';
import { SplashView } from './SplashView';

export const RootApp = () => {
    const [initialized, setInitialized] = useState(false);

    return initialized ? (
        <NavigationContainer>
            <RootStackNavigation />
        </NavigationContainer>
    ) : (
        <SplashView onFinishLoad={() => setInitialized(true)} />
    );
};
