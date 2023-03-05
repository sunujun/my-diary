import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import database from '@react-native-firebase/database';
import { userInfoState } from '../states/userInfoState';
import { diaryListState } from '../states/diaryListState';

export const useCreateDiary = () => {
    const userInfo = useRecoilValue(userInfoState);
    const setDiaryList = useSetRecoilState(diaryListState);

    return useCallback(
        async (photoUrl: string, date: Date | null, title: string, content: string) => {
            if (date === null) {
                return;
            }
            if (content === '') {
                return;
            }
            if (title === '') {
                return;
            }
            const now = new Date().toISOString();
            const userDiaryDB = database().ref(`diary/${userInfo.uid}`).push();
            const saveItem = {
                photoUrl,
                title,
                content,
                date: date.toISOString(),
                createdAt: now,
                updatedAt: now,
            };
            await userDiaryDB.set(saveItem);
            setDiaryList(prevList => {
                return [saveItem].concat(prevList);
            });
        },
        [setDiaryList, userInfo.uid],
    );
};
