import { useRef, useEffect, useState } from 'react';
import { Zoom } from '../Zoom/index';
import { Labels } from '../Labels/index';
import { drawPolyLine, drawSmoothLine, drawDots, ChartCoordinate } from './helpers';
import styles from './styles.module.css';

interface Props {
    lines: Record<string, number[]>,
    labels: string[],
    width?: number,
    height?: number,
    lineWidth?: number,
    colors?: Record<string, string>,
    smoothnessThreshold: number,
    showDots: false,
}


export const Chart = ({
    labels,
    lines,
    colors = {},
    width = 600,
    height = 300,
    lineWidth = 2,
    smoothnessThreshold = 100,
    showDots = false,
}: Props) => {
    const colorsMap: Record<string, string> = {
        ...({ default: '#333333' }),
        ...colors,
    };

    const canvas = useRef<HTMLCanvasElement|null>(null);
    const [bounds, setBounds] = useState([0, 100]);
    const [dpi, setDpi] = useState(1);

    useEffect(() => setDpi(window.devicePixelRatio), [dpi]);

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!canvas.current || !context) {
            return;
        }

        context.clearRect(0, 0, width * dpi, height * dpi);

        for (let key of Object.keys(lines)) {
            const boundStep = (lines[key].length / 100);
            const values = lines[key].slice(Math.round(bounds[0] * boundStep), Math.round(bounds[1] * boundStep));
            const color = colorsMap[key] || colorsMap['default'];

            const max = values.reduce((m, i) => Math.max(m, i), values[0]);
            const step = canvas.current.width / values.length;
            const verticalMultiplier = (canvas.current.height - lineWidth) / max;
            const coordinates = values.map<ChartCoordinate>((value, index) => [
                index * step,
                value * verticalMultiplier
            ]);

            if (coordinates.length > smoothnessThreshold) {
                drawPolyLine(context, coordinates, color);
            } else {
                drawSmoothLine(context, coordinates, color);
            }

            if (showDots) {
                drawDots(context, coordinates, color);
            }
        }
    }, [canvas.current, bounds, showDots]);

    return (
        <div className={styles.root} style={{ width: `${width}px`, minHeight: `${height}px` }}>
            <canvas className={styles.canvas} ref={canvas} width={width * dpi} height={height * dpi} />
            <Zoom onBoundsChange={(...newBounds) => setBounds(newBounds)}/>
            {labels && <Labels items={labels} />}
        </div>
    );
}
