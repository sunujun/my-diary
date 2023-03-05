import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { userInfoState } from '../states/userInfoState';
import { Divider } from '../components/Divider';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { RemoteImage } from '../components/RemoteImage';
import { Icon } from '../components/Icon';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';
import { DiaryStackScreenProps } from '../navigation/types';

export const SettingsScreen = () => {
    const navigation = useNavigation<DiaryStackScreenProps<'AddPassword'>['navigation']>();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const runImagePickAndUpload = useImagePickAndUpload();

    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onPressProfile = useCallback(async () => {
        const result = await runImagePickAndUpload();
        if (result) {
            const imageUrl = result;
            const userDB = `/users/${userInfo.uid}`;
            // 프로필 이미지로 선택한 것 업로드
            setUserInfo(prevState => {
                return {
                    ...prevState,
                    profileImage: imageUrl,
                };
            });
            await database().ref(userDB).update({
                profileImage: imageUrl,
            });
        }
    }, [runImagePickAndUpload, userInfo.uid, setUserInfo]);

    const onPressAddPassword = useCallback(() => {
        navigation.navigate('AddPassword');
    }, [navigation]);

    const onPressClearPassword = useCallback(() => {
        const userDB = `/users/${userInfo.uid}`;
        database().ref(userDB).update({
            password: '',
        });
        setUserInfo(prevState => {
            return {
                ...prevState,
                password: '',
            };
        });
    }, [setUserInfo, userInfo.uid]);

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
                    <Button onPress={onPressAddPassword}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: 12,
                                paddingHorizontal: 24,
                            }}>
                            <Typography fontSize={16}>
                                {userInfo.password !== '' ? '비밀번호 수정' : '비밀번호 추가'}
                            </Typography>
                            <Icon name="chevron-forward-outline" size={16} />
                        </View>
                    </Button>
                    {userInfo.password !== '' && (
                        <Button onPress={onPressClearPassword}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingVertical: 12,
                                    paddingHorizontal: 24,
                                }}>
                                <Typography fontSize={16}>비밀번호 초기화</Typography>
                            </View>
                        </Button>
                    )}
                </View>
            )}
        </View>
    );
};
