import React, { useState } from 'react';
import {
    View,
    TextInput,
    NativeSyntheticEvent,
    StyleProp,
    TextInputSubmitEditingEventData,
    TextStyle,
} from 'react-native';

export const MultiLineInput = ({
    value,
    onChangeText,
    placeholder,
    style,
    fontSize,
    height,
    onSubmitEditing,
}: {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    style?: StyleProp<TextStyle>;
    fontSize?: number;
    height?: string | number;
    onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}) => {
    const [focused, setFocused] = useState(false);

    return (
        <View
            style={{
                alignSelf: 'stretch',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: focused ? 'black' : 'gray',
            }}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                multiline
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={[
                    style,
                    {
                        fontSize: fontSize ?? 20,
                        height: height ?? 200,
                    },
                ]}
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
};
