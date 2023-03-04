import { useCallback } from 'react';
import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

export const useImagePickAndUpload = () => {
    return useCallback(async () => {
        const imagePickResult = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: Platform.OS === 'android',
        });
        if (imagePickResult.didCancel) {
            return;
        }

        if (imagePickResult.assets !== undefined && imagePickResult.assets?.length > 0) {
            const asset = imagePickResult.assets[0];
            const uri = asset.uri ?? '';
            const base64 = asset.base64 ?? '';
            const fileNameArray = uri?.split('/');
            const fileName = fileNameArray?.[fileNameArray.length - 1];
            const reference = storage().ref(fileName);

            if (Platform.OS === 'android') {
                await reference.putString(base64, 'base64', {
                    contentType: asset.type,
                });
            } else {
                await reference.putFile(uri.replace('file://', ''));
            }
            const result = await reference.getDownloadURL();

            return result;
        }

        // const pickPhotoResultArray = imagePickResult.assets?.map(item => {
        //     const uri = item.uri ?? '';
        //     const fileNameArray = uri?.split('/');
        //     const fileName = fileNameArray?.[fileNameArray.length - 1];
        //     const base64 = item.base64 ?? '';
        //     const type = item.type ?? '';

        //     return {
        //         uri: uri,
        //         fileName: fileName,
        //         base64: base64,
        //         type: type,
        //     };
        // });

        // const putResultList = pickPhotoResultArray?.map(async item => {
        //     const result = await storage().ref(item.fileName).putString(item.base64, 'base64', {
        //         contentType: item.type,
        //     });
        //     return await storage().ref(result.metadata.fullPath).getDownloadURL();
        //     // .putFile(Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri);
        // });

        // return putResultList;
    }, []);
};
