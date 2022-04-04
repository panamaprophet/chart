import { useMemo, useState } from 'react';
import { getDevicePixelRatio } from '../../helpers';
import { getAxisYLabels, getCoordinates } from './helpers';
import { Bounds, CanvasSize } from '../../types';


export const useChart = (values: number[][], labels: (string | number)[], { width, height }: CanvasSize) => {
    const pixelRatio = getDevicePixelRatio();
    const [bounds, setBounds] = useState<Bounds>([0, 100]);
    const {
        coordinates,
        startIndex,
        endIndex,
        max,
    } = useMemo(() => getCoordinates(values, bounds, { width: width * pixelRatio, height: height * pixelRatio }), [bounds]);

    const yLabels = useMemo(() => getAxisYLabels(0, max), [max]);
    const yLabelsCoordinates = useMemo(() => yLabels.map((_, index, items) => `${index * (width * pixelRatio / items.length)}px`), [yLabels]);

    const xLabels = useMemo(() => labels.slice(startIndex, endIndex), [startIndex, endIndex]);
    const xLabelsCoordinates = useMemo(() => xLabels.map((_, index) => `${coordinates[0][index][0] / pixelRatio}px`), [xLabels, coordinates]);

    return {
        setBounds,

        coordinates,
        startIndex,
        endIndex,

        yLabels,
        yLabelsCoordinates,

        xLabels,
        xLabelsCoordinates,
    };
};
