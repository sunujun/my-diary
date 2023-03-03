import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button } from '../Button';
import { Icon } from '../Icon';

export const HeaderButton = ({
    onPress,
    iconName,
}: {
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
    iconName: string;
}) => {
    return (
        <Button onPress={onPress}>
            <Icon name={iconName} size={28} color="black" />
        </Button>
    );
};
