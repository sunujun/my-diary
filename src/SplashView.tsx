import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const SplashView = ({ onFinishLoad }: { onFinishLoad: () => void }) => {
    const [showLoginButton, setShowLoginButton] = useState(false);
    const signInUserIdentify = async (idToken: string | null) => {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const result = await auth().signInWithCredential(googleCredential);
        console.log(result);
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
        await database().ref(userDatabaseRefKey).update({
            lastLoginAt: now,
        });
        onFinishLoad();
    };

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
            setShowLoginButton(true);
        }
    }, []);

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
        </View>
    );
};
