import { createContext } from 'react';
import { ChartCoordinate } from '../../types';

interface ChartContextType {
    coordinates: Record<string, ChartCoordinate[]>,
    values: Record<string, number[]>,
    colors: Record<string, string>,
    pixelRatio: number,
    canvasOffset: { x: number, y: number },
}

export const ChartContext = createContext<ChartContextType>({
    pixelRatio: 1,
    colors: {},
    coordinates: {},
    values: {},
    canvasOffset: { x: 0, y: 0 },
});
