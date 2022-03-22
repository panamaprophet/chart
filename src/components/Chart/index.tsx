import { useRef, useEffect, useState, useMemo } from 'react';
import { Dots } from '../Dots/index';
import { Zoom } from '../Zoom/index';
import { ChartContext } from './context';
import { drawPolyLine, drawSmoothLine, getCoordinates, getValuesRange } from './helpers';
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


export const Chart = (props: Props) => {
    const { lines, colors = {}, width = 600, height = 300, lineWidth = 2, smoothnessThreshold = 100 } = props;
    const [bounds, setBounds] = useState([0, 100]);
    const [dpi, setDpi] = useState(1);
    const canvas = useRef<HTMLCanvasElement|null>(null);

    useEffect(() => setDpi(window.devicePixelRatio), [dpi]);

    const values = useMemo(() => getValuesRange(bounds, lines), [dpi, bounds]);
    const coordinates = useMemo(() => getCoordinates(width * dpi, height * dpi - lineWidth, values), [dpi, values]);

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!context) {
            return;
        }

        context.clearRect(0, 0, width * dpi, height * dpi);

        for (let key in coordinates) {
            if (coordinates[key].length > smoothnessThreshold) {
                drawPolyLine(context, coordinates[key], colors[key]);
            } else {
                drawSmoothLine(context, coordinates[key], colors[key]);
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
