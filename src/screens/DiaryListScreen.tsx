import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header/Header';
import { DiaryStackScreenProps } from '../navigation/types';

export const DiaryListScreen = () => {
    const navigation = useNavigation<DiaryStackScreenProps<'DiaryList'>['navigation']>();
    const onPressSettings = useCallback(() => {
        navigation.navigate('Settings');
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="DIARY_LIST" />
                </Header.Group>
                <Header.Button iconName="settings" onPress={onPressSettings} />
            </Header>
        </View>
    );
};
