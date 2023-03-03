import React from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';

export const Badge = ({ children, fontSize }: { children: React.ReactNode; fontSize: number }) => {
    return (
        <View>
            {children}
            <View
                style={[
                    {
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    {
                        position: 'absolute',
                        right: -5,
                        top: -5,
                    },
                ]}>
                <Typography fontSize={fontSize} color="white">
                    N
                </Typography>
            </View>
        </View>
    );
};
