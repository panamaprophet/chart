import { createContext } from 'react';
import { ChartCoordinate } from '../../types/index';


interface ChartContextType {
    coordinates: Record<string, ChartCoordinate[]>,
    values: Record<string, number[]>,
    colors: Record<string, string>,
    pixelRatio: number,
}

export const ChartContext = createContext<ChartContextType>({
    pixelRatio: 1,
    colors: {},
    coordinates: {},
    values: {},
});
