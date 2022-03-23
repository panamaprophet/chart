import { useRef, useEffect, useState, useMemo } from 'react';
import { Axis } from '../Axis/index';
import { Dots } from '../Dots/index';
import { Zoom } from '../Zoom/index';
import { ChartContext } from './context';
import { drawPolyLine, drawSmoothLine, getCoordinates, getDevicePixelRatio, getMax, getValuesRange } from './helpers';
import styles from './styles.module.css';


interface Props {
    lines: Record<string, number[]>,
    labels: string[],
    width?: number,
    height?: number,
    lineWidth?: number,
    colors?: Record<string, string>,
    smoothnessThreshold?: number,
}


export const Chart = (props: Props) => {
    const { lines, colors = {}, width = 600, height = 300, lineWidth = 2, smoothnessThreshold = 100 } = props;

    const [bounds, setBounds] = useState([0, 100]);
    const pixelRatio = getDevicePixelRatio();
    const canvas = useRef<HTMLCanvasElement|null>(null);

    const values = useMemo(() => getValuesRange(bounds, lines), [bounds]);
    const maxValue = useMemo(() => getMax(values), [values]);
    const coordinates = useMemo(() => getCoordinates(width * pixelRatio, height * pixelRatio, maxValue, values), [values]);
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const { x = 0, y = 0 } = canvas.current?.getBoundingClientRect() || canvasOffset;

        setCanvasOffset({ x, y });
    }, [canvas.current]);


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
        <ChartContext.Provider value={{ pixelRatio, values, coordinates, colors, canvasOffset }}>
            <div className={styles.root}>
                <Axis min={0} max={maxValue} />
                <div className={styles.canvasContainer} style={{ width: `${width}px`, height: `${height}px` }}>
                    <canvas
                        className={styles.canvas}
                        ref={canvas}
                        width={width * pixelRatio}
                        height={height * pixelRatio}
                    />
                    <Dots />
                    <Zoom onBoundsChange={newBounds => setBounds(newBounds)} />
                </div>
            </div>
        </ChartContext.Provider>
    );
}
