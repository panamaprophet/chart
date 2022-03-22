
import { ChartCoordinate } from "../../types/index";


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

export const getDotAtCoordinates = (x: number, coordinates: Record<string, ChartCoordinate[]>) => {
    const result: Record<string, number> = {};

    for (let key in coordinates) {
        const distance = (coordinates[key][1][0] - coordinates[key][0][0]) / 2;

        for (let i = 0; i < coordinates[key].length; i++) {
            if (Math.abs(coordinates[key][i][0] - x) < distance) {
                result[key] = i;
                break;
            }
        }
    }

    return result;
};
