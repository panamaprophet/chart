import { ChartCoordinate } from '../../types';


export const drawSmoothLine = (context: CanvasRenderingContext2D, coordinates: ChartCoordinate[], color: string) => {
    context.beginPath();
    context.moveTo(...coordinates[0]);

    for (let i = 0; i < coordinates.length - 1; i ++) {
        const midX = (coordinates[i][0] + coordinates[i + 1][0]) / 2;
        const midY = (coordinates[i][1] + coordinates[i + 1][1]) / 2;
        const controlPointX1 = (midX + coordinates[i][0]) / 2;
        const controlPointX2 = (midX + coordinates[i + 1][0]) / 2;

        context.quadraticCurveTo(
            controlPointX1,
            coordinates[i][1],
            midX,
            midY,
        );

        context.quadraticCurveTo(
            controlPointX2,
            coordinates[i + 1][1],
            coordinates[i + 1][0],
            coordinates[i + 1][1],
        );
    }

    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
};

export const getItemsInRange = <T>(rangeBounds: number[], items: T[]) => {
    const boundStep = items.length / 100;

    return items.slice(
        rangeBounds[0] * boundStep,
        rangeBounds[1] * boundStep
    );
};

export const getRoundMax = (lines: number[][]) => {
    let max = 0;
    let multiplier = 1;

    lines.forEach(line => {
        max = Math.max(max, ...line.slice());
    });

    multiplier = 10 ** (max.toString().length - 1);

    return Math.ceil(max / multiplier) * multiplier;
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

export const getChartData = (
    lines: number[][],
    xLabels: string[],
    bounds: number[],
    { width, height }: { width: number, height: number }
) => {
    const max = getRoundMax(lines);
    const viewport = (bounds[1] - bounds[0]) * width / 100;
    const bias = width / viewport;
    const offsetLeft = bounds[0] * width / 100;

    const coordinates: ChartCoordinate[][] = [];

    lines.forEach((line, lineIndex) => {
        const step = width / (line.length - 1);

        coordinates[lineIndex] = line.map<ChartCoordinate>((value, index) => [
            (step * index - offsetLeft) * bias,
            height - value * (height / max)
        ]);
    });

    return {
        xLabels: getItemsInRange(bounds, xLabels),
        yLabels: getAxisYLabels(0, max),
        coordinates,
        values: lines,
    };
};
