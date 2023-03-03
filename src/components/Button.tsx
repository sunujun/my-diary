import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

export const Button = (
    props: PressableProps & React.RefAttributes<View> & { paddingHorizontal?: number; paddingVertical?: number },
) => {
    return (
        <Pressable
            {...props}
            onPressIn={props.onPressIn}
            onPressOut={props.onPressOut}
            onPress={props.onPress}
            hitSlop={props.hitSlop ?? { left: 0, right: 0, top: 0, bottom: 0 }}
            style={{
                paddingHorizontal: props.paddingHorizontal,
                paddingVertical: props.paddingVertical,
            }}>
            {props.children}
        </Pressable>
    );
};
