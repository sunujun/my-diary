import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { userInfoState } from './states/userInfoState';
import { PasswordInputBox } from './components/PasswordInputBox';
import { useGetDiaryList } from './hooks/useGetDiaryList';

export const SplashView = ({ onFinishLoad }: { onFinishLoad: () => void }) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const runGetDiaryList = useGetDiaryList();

    const [loading, setLoading] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const signInUserIdentify = useCallback(
        async (idToken: string | null) => {
            setLoading(true);
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const result = await auth().signInWithCredential(googleCredential);
            const userDatabaseRefKey = `/users/${result.user.uid}`;
            const userResult = await database()
                .ref(userDatabaseRefKey)
                .once('value')
                .then(snapshot => {
                    return snapshot.val();
                });
            const now = new Date().toISOString();
            if (userResult === null) {
                await database().ref(userDatabaseRefKey).set({
                    name: result.additionalUserInfo?.profile?.name,
                    profileImage: result.additionalUserInfo?.profile?.picture,
                    uid: result.user.uid,
                    password: '',
                    createdAt: now,
                    lastLoginAt: now,
                });
            }
            const _userInfo = await database()
                .ref(userDatabaseRefKey)
                .once('value')
                .then(snapshot => snapshot.val());
            setUserInfo(_userInfo);
            await runGetDiaryList(_userInfo);
            await database().ref(userDatabaseRefKey).update({
                lastLoginAt: now,
            });
            onFinishLoad();
        },
        [onFinishLoad, runGetDiaryList, setUserInfo],
    );

    const onPressGoogleLogin = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        signInUserIdentify(idToken);
    };

    const userSilentLogin = useCallback(async () => {
        try {
            const { idToken } = await GoogleSignin.signInSilently();
            signInUserIdentify(idToken);
        } catch (e) {
            setLoading(false);
            setShowLoginButton(true);
        }
    }, [signInUserIdentify]);

    const googleSignInConfigure = () => {
        GoogleSignin.configure({
            webClientId: '164839873698-heqtsijrb9ml45b3nq1v2aoi82g61asf.apps.googleusercontent.com',
        });
    };

    useEffect(() => {
        googleSignInConfigure();
        userSilentLogin();
    }, [userSilentLogin]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {showLoginButton && <GoogleSigninButton onPress={onPressGoogleLogin} />}
            {showPasswordInput && (
                <PasswordInputBox
                    errorMessage={passwordError}
                    value={inputPassword}
                    onChangeText={async text => {
                        setInputPassword(text);
                        if (text.length === 4) {
                            if (userInfo.password === text) {
                                const now = new Date().toISOString();
                                const userDB = `/users/${userInfo.uid}`;
                                await database().ref(userDB).update({
                                    lastLoginAt: now,
                                });
                                onFinishLoad();
                            } else {
                                setInputPassword('');
                                setPasswordError('비밀번호가 다릅니다.');
                            }
                        }
                    }}
                />
            )}
            {loading && <ActivityIndicator />}
        </View>
    );
};
