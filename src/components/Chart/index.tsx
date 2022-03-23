import { useRef, useEffect, useState, useMemo } from 'react';
import { Dots } from '../Dots/index';
import { Zoom } from '../Zoom/index';
import { ChartContext } from './context';
import { drawPolyLine, drawSmoothLine, getCoordinates, getDevicePixelRatio, getValuesRange } from './helpers';
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
    const pixelRatio = getDevicePixelRatio();
    const canvas = useRef<HTMLCanvasElement|null>(null);

    const values = useMemo(() => getValuesRange(bounds, lines), [pixelRatio, bounds]);
    const coordinates = useMemo(() => getCoordinates(width * pixelRatio, height * pixelRatio - lineWidth, values), [pixelRatio, values]);

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!context) {
            return;
        }

        context?.clearRect(0, 0, width * pixelRatio, height * pixelRatio);


        for (let key in coordinates) {
            if (coordinates[key].length > smoothnessThreshold) {
                drawPolyLine(context, coordinates[key], colors[key]);
            } else {
                drawSmoothLine(context, coordinates[key], colors[key]);
            }
        }
    }, [canvas.current, coordinates]);

    return (
        <ChartContext.Provider value={{ pixelRatio, values, coordinates, colors }}>
            <div className={styles.root} style={{ width: `${width}px`, minHeight: `${height}px` }}>
                <canvas
                    className={styles.canvas}
                    ref={canvas}
                    width={width * pixelRatio}
                    height={height * pixelRatio}
                />
                <Dots />
                <Zoom onBoundsChange={newBounds => setBounds(newBounds)} />
            </div>
        </ChartContext.Provider>
    );
}
