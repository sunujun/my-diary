import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface DiaryItem {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    imageUrl: string;
}

type RootStackParamList = {
    DiaryStack: NativeStackScreenProps<DiaryStackParamList>;
    AddDiary: undefined;
};

type DiaryStackParamList = {
    DiaryList: undefined;
    DiaryDetail: { item: DiaryItem };
    Settings: undefined;
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
