import { atom } from 'recoil';

interface IUserInfo {
    name: string;
    profileImage: string;
    uid: string;
    password: string;
    createdAt: string;
    lastLoginAt: string;
}

export const userInfo = atom<IUserInfo | null>({
    key: 'MAIN/USER_INFO',
    default: null,
});
