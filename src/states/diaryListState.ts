import { atom } from 'recoil';

export interface IDiary {
    photoUrl: string;
    title: string;
    content: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export const diaryListState = atom<IDiary[]>({
    key: 'MAIN/DIARY_LIST',
    default: [],
});
