import { createContext } from 'react';


interface ChartContextType {
    colors: Record<string, string>,
    pixelRatio: number,
    canvasOffset: { x: number, y: number },
}


export const ChartContext = createContext<ChartContextType>({
    pixelRatio: 1,
    colors: {},
    canvasOffset: { x: 0, y: 0 },
});
