import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header/Header';

export const AddDiaryScreen = () => {
    const navigation = useNavigation();
    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="ADD_DIARY" />
                </Header.Group>
                <Header.Button iconName="close" onPress={onPressBack} />
            </Header>
        </View>
    );
};
