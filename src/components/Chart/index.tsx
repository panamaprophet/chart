import { useRef, useEffect, useState, useMemo } from 'react';
import { Dots } from '../Dots/index';
import { Zoom } from '../Zoom/index';
import { ChartContext } from './context';
import { drawPolyLine, drawSmoothLine } from './helpers';
import { ChartCoordinate } from "../../types/index";
import styles from './styles.module.css';


interface Props {
    lines: Record<string, number[]>,
    labels: string[],
    width?: number,
    height?: number,
    lineWidth?: number,
    colors?: Record<string, string>,
    smoothnessThreshold: number,
}


export const Chart = ({
    labels,
    lines,
    colors: colorsProp = {},
    width = 600,
    height = 300,
    lineWidth = 2,
    smoothnessThreshold = 100,
}: Props) => {
    const colors: Record<string, string> = {
        ...({ default: '#333333' }),
        ...colorsProp,
    };

    const canvas = useRef<HTMLCanvasElement|null>(null);
    const [bounds, setBounds] = useState([0, 100]);
    const [dpi, setDpi] = useState(1);

    useEffect(() => setDpi(window.devicePixelRatio), [dpi]);

    const values = useMemo(() => {
        const result: Record<string, number[]> = {};

        for (let key in lines) {
            const boundStep = (lines[key].length / 100);

            result[key] = lines[key].slice(
                Math.round(bounds[0] * boundStep),
                Math.round(bounds[1] * boundStep)
            );
        }

        return result;
    }, [dpi, bounds]);

    const coordinates = useMemo(() => {
        const result: Record<string, ChartCoordinate[]> = {};
        const canvasWidth = width * dpi;
        const canvasHeight = height * dpi;

        for (let key in values) {
            const max = values[key].reduce((m, i) => Math.max(m, i), values[key][0]);
            const step = canvasWidth / values[key].length;
            const verticalMultiplier = (canvasHeight - lineWidth) / max;

            result[key] = values[key].map<ChartCoordinate>((value, index) => [
                index * step,
                canvasHeight - value * verticalMultiplier
            ]);
        }

        return result;
    }, [dpi, values]);

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!canvas.current || !context) {
            return;
        }

        context.clearRect(0, 0, width * dpi, height * dpi);

        for (let key in coordinates) {
            const color = colors[key] || colors['default'];

            if (coordinates[key].length > smoothnessThreshold) {
                drawPolyLine(context, coordinates[key], color);
            } else {
                drawSmoothLine(context, coordinates[key], color);
            }
        }
    }, [canvas.current, coordinates]);

    return (
        <ChartContext.Provider value={{ dpi, values, coordinates, colors }}>
            <div className={styles.root} style={{ width: `${width}px`, minHeight: `${height}px` }}>
                <canvas
                    className={styles.canvas}
                    ref={canvas}
                    width={width * dpi}
                    height={height * dpi}
                />
                <Dots />
                <Zoom onBoundsChange={newBounds => setBounds(newBounds)} />
            </div>
        </ChartContext.Provider>
    );
}
