import { ChartCoordinate } from '../../types';


export const drawSmoothLine = (context: CanvasRenderingContext2D, coordinates: ChartCoordinate[], color: string) => {
    context.beginPath();
    context.moveTo(coordinates[0][0], coordinates[0][1]);

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

export const drawPolyLine = (context: CanvasRenderingContext2D, coordinates: ChartCoordinate[], color: string) => {
    context.beginPath();
    context.moveTo(coordinates[0][0], coordinates[0][1]);

    for (let i = 1; i < coordinates.length; i ++) {
        context.lineTo(coordinates[i][0], coordinates[i][1]);
    }

    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
};

export const getValuesRange = <T>(rangeBounds: number[], lines: {[k: string]: T[]}) => {
    const result: {[k: string]: T[]} = {};

    for (const key in lines) {
        const boundStep = (lines[key].length / 100);

        result[key] = lines[key].slice(
            Math.round(rangeBounds[0] * boundStep),
            Math.round(rangeBounds[1] * boundStep)
        );
    }

    return result;
};

export const getMax = (values: { [k: string]: number[] }) => {
    let max = 0;
    let multiplier = 1;

    for (const key in values) {
        max = Math.max(max, ...values[key]);
    }

    multiplier = Math.pow(10, (max.toString().length - 1));

    return Math.ceil(max / multiplier) * multiplier;
};

export const getCoordinates = (
    canvasWidth: number,
    canvasHeight: number,
    max: number,
    values: { [k: string]: number[] },
) => {
    const result: Record<string, ChartCoordinate[]> = {};

    for (const key in values) {
        const step = canvasWidth / values[key].length;

        result[key] = values[key].map<ChartCoordinate>((value, index) => [
            step * index,
            canvasHeight - value * (canvasHeight / max)
        ]);
    }

    return result;
};

export const getDevicePixelRatio = () => window.devicePixelRatio;
