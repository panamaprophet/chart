import { useState, useMemo } from 'react';
import { CanvasSize, Bounds } from '../../types';
import { getCoordinates } from './helpers';


export const useCoordinates = (values: number[][], canvasSize: CanvasSize) => {
    const [bounds, setBounds] = useState<Bounds>([0, 100]);
    const {
        coordinates,
        startIndex,
        endIndex,
        max,
    } = useMemo(() => getCoordinates(values, bounds, canvasSize), [bounds]);

    return {
        bounds,
        setBounds,
        coordinates,
        startIndex,
        endIndex,
        max,
    };
};
