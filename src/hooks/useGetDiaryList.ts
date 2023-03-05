import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import database from '@react-native-firebase/database';
import { diaryListState } from '../states/diaryListState';
import { IUserInfo } from '../states/userInfoState';

export const useGetDiaryList = () => {
    const setDiaryList = useSetRecoilState(diaryListState);

    return useCallback(
        async (userInfo: IUserInfo) => {
            const userDiaryDB = database().ref(`diary/${userInfo.uid}`);
            const diaryListResult = await userDiaryDB.once('value').then(snapshot => {
                return snapshot.val();
            });
            const list = diaryListResult === null ? [] : Object.keys(diaryListResult).map(key => diaryListResult[key]);
            setDiaryList(list);
        },
        [setDiaryList],
    );
};
