import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Typography } from './components/Typography';

export const SplashView = ({ onFinishLoad }: { onFinishLoad: () => void }) => {
    useEffect(() => {
        setTimeout(() => {
            onFinishLoad();
        }, 2000);
    }, [onFinishLoad]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={20}>SPLASH</Typography>
        </View>
    );
};
