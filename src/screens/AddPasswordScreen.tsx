import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { Header } from '../components/Header/Header';
import { PasswordInputBox } from '../components/PasswordInputBox';
import { Spacer } from '../components/Spacer';
import { userInfoState } from '../states/userInfoState';

export const AddPasswordScreen = () => {
    const [firstInput, setFirstInput] = useState('');
    const [secondInput, setSecondInput] = useState('');
    const [isInputFirst, setIsInputFirst] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const navigation = useNavigation();

    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onCompleteInputPassword = useCallback(async () => {
        if (firstInput !== secondInput) {
            return;
        }
        const userDB = `/users/${userInfo.uid}`;
        await database().ref(userDB).update({
            password: firstInput,
        });
        setUserInfo(prevState => {
            return {
                ...prevState,
                password: firstInput,
            };
        });
        navigation.goBack();
    }, [firstInput, navigation, secondInput, setUserInfo, userInfo.uid]);

    useEffect(() => {
        if (firstInput.length < 4) {
            return;
        }
        if (secondInput.length < 4) {
            return;
        }
        if (firstInput === secondInput) {
            // 저장
            onCompleteInputPassword();
        } else {
            setErrorMessage('비밀번호가 다릅니다.');
            setSecondInput('');
        }
    }, [firstInput, onCompleteInputPassword, secondInput]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Button iconName="arrow-back" onPress={onPressBack} />
                    <Spacer space={12} />
                    <Header.Title title={userInfo.password !== '' ? '비밀번호 수정' : '비밀번호 추가'} />
                </Header.Group>
            </Header>
            <View style={{ flex: 1, paddingTop: 32 }}>
                <PasswordInputBox
                    value={isInputFirst ? firstInput : secondInput}
                    onChangeText={text => {
                        if (isInputFirst) {
                            setFirstInput(text);

                            if (text.length === 4) {
                                setIsInputFirst(false);
                            }
                        } else {
                            setSecondInput(text);
                        }
                    }}
                    errorMessage={errorMessage}
                />
            </View>
        </View>
    );
};
