import { useMemo } from 'react';
import { getDevicePixelRatio } from '../../helpers';
import { useCoordinates } from '../useCoordinates';
import { getAxisYLabels } from './helpers';
import { CanvasSize } from '../../types';


export const useChart = (values: number[][], labels: (string | number)[], { width, height }: CanvasSize) => {
    const pixelRatio = getDevicePixelRatio();

    const {
        setBounds,
        coordinates,
        startIndex,
        endIndex,
        max,
    } = useCoordinates(values, { width: width * pixelRatio, height: height * pixelRatio });

    const yLabels = useMemo(() => getAxisYLabels(0, max), [max]);
    const yLabelsCoordinates = useMemo(() => yLabels.map((_, index, items) => `${(index / items.length) * 100}%`), [yLabels]);

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
