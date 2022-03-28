import { useState, useMemo } from 'react';
import { CanvasSize, Bounds } from '../../types';
import { getCoordinates } from './helpers';


export const useCoordinates = (values: number[][], { width, height }: CanvasSize) => {
    const [bounds, setBounds] = useState<Bounds>([0, 100]);
    const chartData = useMemo(() => getCoordinates(values, bounds, { width, height }), [bounds]);

    return {
        bounds,
        setBounds,
        ...chartData,
    };
};
