import React from 'react';
import { RecoilRoot } from 'recoil';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';

function App(): JSX.Element {
    return (
        <RecoilRoot>
            <SafeAreaProvider>
                <RootApp />
            </SafeAreaProvider>
        </RecoilRoot>
    );
}

export default App;
