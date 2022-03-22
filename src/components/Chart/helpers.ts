export type ChartCoordinate = [x: number, y: number];


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

export const drawDots = (context: CanvasRenderingContext2D, coordinates: ChartCoordinate[], color: string) => {
    for (let i = 0; i < coordinates.length; i ++) {
        context.beginPath();
        context.arc(coordinates[i][0], coordinates[i][1], 3, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }
};
