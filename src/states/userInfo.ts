import { atom } from 'recoil';

interface IUserInfo {
    name: string;
    profileImage: string;
    uid: string;
    password: string;
    createdAt: string;
    lastLoginAt: string;
}

export const userInfo = atom<IUserInfo>({
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
