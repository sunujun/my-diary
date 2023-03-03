import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

export const LocalImage = ({
    localAsset,
    style,
    width,
    height,
}: {
    localAsset: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
    width?: string | number;
    height?: string | number;
}) => {
    return (
        <Image
            source={localAsset}
            style={[
                style,
                {
                    width: width,
                    height: height,
                },
            ]}
        />
    );
};
