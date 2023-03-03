import React, { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomLinkList } from '../states/atomLinkList';
import { getItem } from '../utils/AsyncStorageUtils';

export const RecoilCustomPersist = ({ children }: { children: React.ReactNode }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const setList = useSetRecoilState(atomLinkList);

    const loadData = useCallback(async () => {
        const data = await getItem('MAIN/LINK_LIST');
        if (data !== null) {
            setList(JSON.parse(data));
        }
        setIsLoaded(true);
    }, [setList]);

    useEffect(() => {
        if (isLoaded) {
            return;
        }

        loadData();
    }, [isLoaded, loadData]);

    return <>{isLoaded && children}</>;
};
