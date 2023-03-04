import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';

export const DiaryDetailScreen = () => {
    const navigation = useNavigation();
    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Button iconName="arrow-back" onPress={onPressBack} />
                    <Spacer space={12} horizontal />
                    <Header.Title title="DIARY_DETAIL" />
                </Header.Group>
            </Header>
        </View>
    );
};
