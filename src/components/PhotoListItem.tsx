import React, { useCallback, useRef } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from './Button';
import { RemoteImage } from './RemoteImage';
import { BottomTabScreenNavigationProp } from '../navigation/types';

export const PhotoListItem = ({ url }: { url: string }) => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation<BottomTabScreenNavigationProp>();
    const scaleAnimatedValue = useRef(new Animated.Value(0)).current;

    const onPressItem = useCallback(() => {
        navigation.navigate('ImageDetail', { url: url });
    }, [navigation, url]);

    const onPressIn = useCallback(() => {
        Animated.timing(scaleAnimatedValue, {
            duration: 200,
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [scaleAnimatedValue]);

    const onPressOut = useCallback(() => {
        Animated.timing(scaleAnimatedValue, {
            duration: 200,
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [scaleAnimatedValue]);

    const scale = scaleAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1.0, 0.95],
    });

    return (
        <Button
            onPress={onPressItem}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            paddingHorizontal={20}
            paddingVertical={10}>
            <Animated.View style={{ transform: [{ scale: scale }] }}>
                <RemoteImage url={url} width={width - 40} height={width * 1.2} />
            </Animated.View>
        </Button>
    );
};
