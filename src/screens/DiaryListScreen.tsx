import React, { useCallback, useEffect } from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { DiaryStackScreenProps } from '../navigation/types';
import { diaryListState } from '../states/diaryListState';
import { userInfoState } from '../states/userInfoState';

export const DiaryListScreen = () => {
    const navigation = useNavigation<DiaryStackScreenProps<'DiaryList'>['navigation']>();
    const safeAreaInset = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    // const userInfo = useRecoilValue(userInfoState);
    const diaryList = useRecoilValue(diaryListState);

    const onPressSettings = useCallback(() => {
        navigation.navigate('Settings');
    }, [navigation]);

    const onPressAdd = useCallback(() => {
        navigation.navigate('AddDiary');
    }, [navigation]);

    // const refreshDiaryList = useCallback(async () => {
    //     const diaryListDB = await database()
    //         .ref(`diary/${userInfo.uid}`)
    //         .once('value')
    //         .then(snapshot => snapshot.val());
    //     setDiaryList(Object.keys(diaryListDB).map(item => diaryListDB[item]));
    // }, [setDiaryList, userInfo.uid]);

    // useEffect(() => {
    //     refreshDiaryList();
    // }, [refreshDiaryList]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Header>
                    <Header.Group>
                        <Header.Title title="DIARY_LIST" />
                    </Header.Group>
                    <Header.Button iconName="settings" onPress={onPressSettings} />
                </Header>
                <FlatList
                    data={diaryList}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingVertical: 32,
                    }}
                    renderItem={({ item }) => {
                        return (
                            <Button
                                onPress={() => {
                                    navigation.navigate('DiaryDetail', { item });
                                }}>
                                <View style={{ paddingVertical: 12 }}>
                                    {item.photoUrl !== null && (
                                        <>
                                            <RemoteImage
                                                url={item.photoUrl}
                                                width={width - 24 * 2}
                                                height={(width - 24 * 2) / 2}
                                                style={{ borderRadius: 8 }}
                                            />
                                            <Spacer space={4} />
                                        </>
                                    )}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Typography fontSize={18}>{item.title}</Typography>
                                            <Spacer space={4} />
                                            <Typography fontSize={12}>{item.content}</Typography>
                                        </View>
                                        <Typography fontSize={12}>{`${new Date(item.date).getFullYear()}-${
                                            new Date(item.date).getMonth() + 1
                                        }-${new Date(item.date).getDate()}`}</Typography>
                                    </View>
                                </View>
                            </Button>
                        );
                    }}
                />
            </View>
            <View style={{ position: 'absolute', right: 12, bottom: safeAreaInset.bottom + 24 }}>
                <Button onPress={onPressAdd}>
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Icon name="add" color="white" size={30} />
                    </View>
                </Button>
            </View>
        </View>
    );
};
