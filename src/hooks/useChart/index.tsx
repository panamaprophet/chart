import { useMemo } from 'react';
import { getDevicePixelRatio } from '../../helpers';
import { useCoordinates } from '../useCoordinates';
import { getAxisYLabels } from './helpers';


export const useChart = (values: number[][], labels: string[], { width, height }: { width: number, height: number }) => {
    const pixelRatio = getDevicePixelRatio();

    console.time('useChart');

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

    console.timeEnd('useChart');

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
