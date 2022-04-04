import { Bounds, CanvasSize } from "../../types";


const getMax = (line: number[]) => {
    const max = Math.max(...line);
    const multiplier = 10 ** (max.toString().length - 1);

    return Math.ceil(max / multiplier) * multiplier;
};

const getBias = (bounds: Bounds, canvasWidth: number) => {
    const [leftBound, rightBound] = bounds;
    const viewport = (rightBound - leftBound) * canvasWidth / 100;

    return canvasWidth / viewport;
};

const getStartIndex = (leftBound: number, itemsLength: number) => Math.floor(itemsLength / 100 * leftBound);

const getEndIndex = (rightBound: number, itemsLength: number) => Math.ceil(itemsLength / 100 * rightBound);

const getViewport = ([leftBound, rightBound]: Bounds, lines: number[][], width: number) => ({
    startIndex: getStartIndex(leftBound, lines[0].length),
    endIndex: getEndIndex(rightBound, lines[0].length),
    bias: getBias([leftBound, rightBound], width),
});


export const getCoordinates = (
    lines: number[][],
    bounds: Bounds,
    canvasSize: CanvasSize
) => {
    const { width, height } = canvasSize;
    const { bias, startIndex, endIndex } = getViewport(bounds, lines, width);
    const max = getMax([...lines.map(line => getMax(line.slice(startIndex, endIndex)))]);
    const offsetLeft = bounds[0] * width / 100;
    const coordinates = new Array(lines.length);

    lines.forEach((line, lineIndex) => {
        const step = width / (line.length - 1);

        coordinates[lineIndex] = [];

        for (let i = startIndex > 0 ? (startIndex - 1) : startIndex; i < endIndex; i++) {
            const x = (step * i - offsetLeft) * bias;
            const y = height - line[i] * (height / max);

            coordinates[lineIndex].push([x, y]);
        }
    });

    return { coordinates, startIndex, endIndex, max };
};

export const getAxisYLabels = (min: number, max: number) => {
    const multiplier = Math.pow(10, max.toString().length - 1) / 2;
    const result = [];

    let i = min;

    while (i < max) {
        result.push(i);

        i += multiplier;
    }

    return result;
};
