import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Typography } from './Typography';

export const LottoNumberView = ({ numbers }: { numbers: number[] }) => {
    const [viewHeight, setViewHeight] = useState(0);
    const animatedValue = useRef(new Animated.Value(1)).current;
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-viewHeight * 0.6, 0],
    });
    const getNumberBackgroundColor = useCallback(() => {
        const randomNumber = Math.floor(Math.random() * 10) % 6;
        switch (randomNumber) {
            case 0:
                return 'red';
            case 1:
                return 'blue';
            case 2:
                return 'gray';
            case 3:
                return 'green';
            case 4:
                return 'purple';
            default:
                return 'black';
        }
    }, []);

    useEffect(() => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            duration: 1000,
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animatedValue, numbers]);

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'hidden',
            }}
            onLayout={({ nativeEvent }) => {
                setViewHeight(nativeEvent.layout.height);
            }}>
            {numbers.map(item => {
                return (
                    <Animated.View
                        key={`lotto-${item}`}
                        style={{
                            backgroundColor: getNumberBackgroundColor(),
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: [{ translateY: translateY }],
                        }}>
                        <Typography fontSize={20} color="white">
                            {item}
                        </Typography>
                    </Animated.View>
                );
            })}
        </View>
    );
};
