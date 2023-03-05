import { atom } from 'recoil';

export interface IUserInfo {
    name: string;
    profileImage: string;
    uid: string;
    password: string;
    createdAt: string;
    lastLoginAt: string;
}

export const userInfoState = atom<IUserInfo>({
    key: 'MAIN/USER_INFO',
    default: {
        name: '',
        profileImage: '',
        uid: '',
        password: '',
        createdAt: '',
        lastLoginAt: '',
    },
});
