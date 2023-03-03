import React from 'react';
import { Typography } from '../Typography';

export const Title = ({ title }: { title: string }) => {
    return <Typography fontSize={18}>{title}</Typography>;
};
