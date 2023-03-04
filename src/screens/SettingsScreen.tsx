import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRecoilState } from 'recoil';
import { userInfo as userInfoState } from '../states/userInfo';
import { Divider } from '../components/Divider';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { RemoteImage } from '../components/RemoteImage';

export const SettingsScreen = () => {
    const [userInfo] = useRecoilState(userInfoState);
    const navigation = useNavigation();

    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);
    const onPressProfile = useCallback(() => {}, []);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Button iconName="arrow-back" onPress={onPressBack} />
                    <Spacer space={12} horizontal />
                    <Header.Title title="SETTINGS" />
                </Header.Group>
            </Header>
            {userInfo !== null && (
                <View style={{ flex: 1, paddingTop: 32 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Button onPress={onPressProfile}>
                            <RemoteImage
                                url={userInfo.profileImage}
                                width={100}
                                height={100}
                                style={{ borderRadius: 50 }}
                            />
                        </Button>
                        <Spacer space={20} />
                        <Typography fontSize={20}>{userInfo.name}</Typography>
                    </View>
                    <Spacer space={20} />
                    <Divider />
                    <Spacer space={20} />
                </View>
            )}
        </View>
    );
};
