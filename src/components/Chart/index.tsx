import { useRef, useEffect, useState } from 'react';
import { Zoom } from '../Zoom/index';
import styles from './styles.module.css';

type ChartCoordinate = [x: number, y: number];

interface Props {
    labels: Record<string, string>,
    lines: Record<string, number[]>,
    width?: number,
    height?: number,
    lineWidth?: number,
    colors?: Record<string, string>,
}


export const Chart = ({ labels, lines, colors = {}, width = 600, height = 300, lineWidth = 2 }: Props) => {
    const colorsMap: Record<string, string> = {
        ...({ default: '#333333' }),
        ...colors,
    };

    const canvas = useRef<HTMLCanvasElement|null>(null);
    const [bounds, setBounds] = useState([0, 100]);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }

        const context = canvas.current.getContext('2d');

        if (!context) {
            return;
        }

        for (let key of Object.keys(lines)) {
            const boundStep = (lines[key].length / 100);
            const values = lines[key].slice(
                Math.round(bounds[0] * boundStep),
                Math.round(bounds[1] * boundStep)
            );

            const max = values.reduce((m, i) => Math.max(m, i), values[0]);
            const step = canvas.current.width / values.length;
            const verticalMultiplier = (canvas.current.height - lineWidth) / max;
            const coordinates = values.map<ChartCoordinate>((value, index) => [index * step, value * verticalMultiplier]);

            context.clearRect(0, 0, width, height);
            context.beginPath();
            context.moveTo((coordinates[0][0]), coordinates[0][1]);

            for(let i = 0; i < coordinates.length-1; i ++) {
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

            context.strokeStyle = colorsMap[key] || colorsMap['default']
            context.stroke();
        }
    }, [canvas.current, bounds]);

    return (
        <div className={styles.root} style={{ width: `${width}px` }}>
            <canvas ref={canvas} width={width} height={height}></canvas>
            <Zoom onBoundsChange={(...newBounds) => setBounds(newBounds)}/>
        </div>
    );
}
