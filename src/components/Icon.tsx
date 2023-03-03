import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Icon = ({ name, size, color }: { name: string; size: number; color: string }) => {
    return <Ionicons name={name} size={size} color={color} />;
};
