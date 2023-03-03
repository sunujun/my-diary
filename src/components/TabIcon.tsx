import React from 'react';
import { Icon } from './Icon';
import { Badge } from './Badge';

export const TabIcon = ({
    visibleBadge,
    iconName,
    iconColor,
}: {
    visibleBadge?: boolean;
    iconName: string;
    iconColor: string;
}) => {
    if (visibleBadge) {
        return (
            <Badge fontSize={10}>
                <Icon name={iconName} size={20} color={iconColor} />
            </Badge>
        );
    }

    return <Icon name={iconName} size={20} color={iconColor} />;
};
