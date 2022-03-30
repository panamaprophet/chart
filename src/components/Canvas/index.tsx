import { useRef, useEffect } from 'react';
import { getDevicePixelRatio } from '../../helpers';
import { clearCanvas, drawSmoothLine } from './helpers';
import { Coordinate } from '../../types';


interface Props {
    width: number,
    height: number,
    coordinates: Coordinate[][],
    colors: string[],
}


export const Canvas = ({ coordinates, width, height, colors }: Props) => {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const pixelRatio = getDevicePixelRatio();

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!context) {
            return;
        }

        clearCanvas(context);

        coordinates
            .forEach((line, lineIndex) =>
                drawSmoothLine(context, line, colors[lineIndex]));
    }, [coordinates]);

    return (
        <canvas
            ref={canvas}
            width={width * pixelRatio}
            height={height * pixelRatio}
        />
    );
};
