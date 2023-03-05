import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IDiary } from '../states/diaryListState';

type RootStackParamList = {
    DiaryStack: NativeStackScreenProps<DiaryStackParamList>;
    AddDiary: undefined;
};

type DiaryStackParamList = {
    DiaryList: undefined;
    DiaryDetail: { item: IDiary };
    Settings: undefined;
    AddPassword: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type DiaryStackScreenProps<T extends keyof DiaryStackParamList> = CompositeScreenProps<
    NativeStackScreenProps<DiaryStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
