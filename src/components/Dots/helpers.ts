import { ChartCoordinate } from '../../types/index';


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
