import { useState, useMemo } from 'react';
import { getDevicePixelRatio } from '../../helpers';


type CanvasSize = { width: number, height: number };

type Bounds = [leftBound: number, rightBound: number];


const getMax = (line: number[]) => {
    const max = Math.max(...line);
    const multiplier = 10 ** (max.toString().length - 1);

    return Math.ceil(max / multiplier) * multiplier;
};

const getAxisYLabels = (min: number, max: number) => {
    const multiplier = Math.pow(10, max.toString().length - 1) / 2;
    const result = [];

    let i = min;

    while (i < max) {
        result.push(i);

        i += multiplier;
    }

    return result;
};

const getChartData = (
    lines: number[][],
    bounds: [leftBound: number, rightBound: number],
    { width, height }: { width: number, height: number }
) => {
    const [leftBound, rightBound] = bounds;

    const startIndex = Math.floor(lines[0].length / 100 * leftBound);
    const endIndex = Math.ceil(lines[0].length / 100 * rightBound);

    const max = getMax([...lines.map(line => getMax(line.slice(startIndex, endIndex)))]);
    const viewport = (rightBound - leftBound) * width / 100;

    const bias = width / viewport;
    const offsetLeft = leftBound * width / 100;
    const coordinates: [x: number, y: number][][] = [];

    lines.forEach((line, lineIndex) => {
        const step = width / (line.length - 1);

        coordinates[lineIndex] = [];

        for (let i = startIndex > 0 ? (startIndex - 1) : startIndex; i < endIndex; i++) {
            const x = (step * i - offsetLeft) * bias;
            const y = height - line[i] * (height / max);

            coordinates[lineIndex].push([x, y]);
        }
    });

    return {
        coordinates,
        startIndex,
        endIndex,
        max,
    };
};


export const useCoordinates = (values: number[][], { width, height }: CanvasSize) => {
    const [bounds, setBounds] = useState<Bounds>([0, 100]);

    const {
        coordinates,
        startIndex,
        endIndex,
        max,
    } = useMemo(() => getChartData(values, bounds, { width, height }), [bounds]);

    return {
        bounds,
        setBounds,
        coordinates,
        startIndex,
        endIndex,
        max,
    };
};

export const useChart = (values: number[][], labels: string[], { width, height }: { width: number, height: number }) => {
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
    const xLabelsCoordinates = useMemo(() => xLabels.map((_, index) => coordinates[0][index][0] / pixelRatio), [xLabels]);

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
