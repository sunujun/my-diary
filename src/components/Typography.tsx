import React from 'react';
import { Text } from 'react-native';

export const Typography = ({
    color,
    fontSize,
    children,
    numberOfLines,
}: {
    color?: string;
    fontSize?: number;
    children: React.ReactNode | string;
    numberOfLines?: number;
}) => {
    return (
        <Text
            style={{
                color: color,
                fontSize: fontSize,
            }}
            numberOfLines={numberOfLines}>
            {children}
        </Text>
    );
};
