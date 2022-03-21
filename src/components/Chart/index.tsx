import { useRef, useEffect, useState } from 'react';
import { Zoom } from '../Zoom/index';
import { drawPolyLine, drawSmoothLine, ChartCoordinate } from './helpers';
import styles from './styles.module.css';

interface Props {
    labels: Record<string, string>,
    lines: Record<string, number[]>,
    width?: number,
    height?: number,
    lineWidth?: number,
    colors?: Record<string, string>,
    smoothnessThreshold: number,
}


export const Chart = ({
    labels,
    lines,
    colors = {},
    width = 600,
    height = 300,
    lineWidth = 2,
    smoothnessThreshold = 50,
}: Props) => {
    const colorsMap: Record<string, string> = {
        ...({ default: '#333333' }),
        ...colors,
    };

    const canvas = useRef<HTMLCanvasElement|null>(null);
    const [bounds, setBounds] = useState([0, 100]);

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!canvas.current || !context) {
            return;
        }

        context.clearRect(0, 0, width, height);

        for (let key of Object.keys(lines)) {
            const boundStep = (lines[key].length / 100);
            const values = lines[key].slice(Math.round(bounds[0] * boundStep), Math.round(bounds[1] * boundStep));

            const max = values.reduce((m, i) => Math.max(m, i), values[0]);
            const step = canvas.current.width / values.length;
            const verticalMultiplier = (canvas.current.height - lineWidth) / max;
            const coordinates = values.map<ChartCoordinate>((value, index) => [
                index * step,
                value * verticalMultiplier
            ]);

            if (coordinates.length > smoothnessThreshold) {
                drawPolyLine(context, coordinates, colorsMap[key] || colorsMap['default']);
            } else {
                drawSmoothLine(context, coordinates, colorsMap[key] || colorsMap['default']);
            }
        }
    }, [canvas.current, bounds]);

    return (
        <div className={styles.root} style={{ width: `${width}px` }}>
            <canvas ref={canvas} width={width} height={height}></canvas>
            <Zoom onBoundsChange={(...newBounds) => setBounds(newBounds)}/>
        </div>
    );
}
