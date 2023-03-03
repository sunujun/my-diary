import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

export const RemoteImage = ({
    url,
    style,
    width,
    height,
}: {
    url: string;
    style?: StyleProp<ImageStyle>;
    width: number;
    height: number;
}) => {
    return <Image source={{ uri: url }} style={[style, { width: width, height: height }]} />;
};
