import { ChartCoordinate } from '../../types/index';


export const getDotAtCoordinates = (x: number, coordinates: ChartCoordinate[]) => {
    const distance = coordinates[1][0] - coordinates[0][0];

    for (let i = 0; i < coordinates.length; i++) {
        if (Math.abs(coordinates[i][0] - x) < distance) {
            return i;
        }
    }

    return null;
};
