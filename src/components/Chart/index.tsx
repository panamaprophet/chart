import { useRef, useEffect, useState, useMemo } from 'react';
import { Axis } from '../Axis';
import { getAxisYLabels } from '../Axis/helpers';
import { Dots } from '../Dots';
import { Zoom } from '../Zoom';
import { ChartContext } from './context';
import {
    drawPolyLine,
    drawSmoothLine,
    getCoordinates,
    getDevicePixelRatio,
    getRoundMax,
    getValuesRange,
} from './helpers';

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
    const { labels, lines, colors = {}, width = 600, height = 300, smoothnessThreshold = 100 } = props;

    const [bounds, setBounds] = useState([0, 100]);
    const [bias, setBias] = useState(1);
    const pixelRatio = getDevicePixelRatio();
    const canvas = useRef<HTMLCanvasElement|null>(null);

    const values = useMemo(() => getValuesRange(bounds, lines), [bounds]);
    const maxValue = useMemo(() => getRoundMax(values), [values]);
    const coordinates = useMemo(() => getCoordinates(width * pixelRatio, height * pixelRatio, maxValue, bias, values), [values]);
    const { labels: xLabels } = useMemo(() => getValuesRange(bounds, { labels }), [bounds]);
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const { x, y } = canvas.current?.getBoundingClientRect() || canvasOffset;

        setCanvasOffset({ x, y });
    }, [canvas.current]);

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!context) {
            return;
        }

        context?.clearRect(0, 0, width * pixelRatio, height * pixelRatio);

        for (const key in coordinates) {
            if (coordinates[key].length > smoothnessThreshold) {
                drawPolyLine(context, coordinates[key], colors[key]);
            } else {
                drawSmoothLine(context, coordinates[key], colors[key]);
            }
        }
    }, [canvas.current, coordinates]);

    return (
        <div className={styles.root}>
            <ChartContext.Provider value={{ pixelRatio, colors, canvasOffset }}>
                <div className={styles.axisY}>
                    <Axis labels={getAxisYLabels(0, maxValue)} direction="vertical" />
                </div>
                <div className={styles.axisX}>
                    <Axis labels={xLabels} direction="horizontal" />
                </div>
                <div className={styles.canvas}>
                    <canvas ref={canvas} width={width * pixelRatio} height={height * pixelRatio} />
                    <Dots coordinates={coordinates} values={values} />
                </div>
                <div className={styles.zoom}>
                    <Zoom onBoundsChange={(newBounds) => {
                        const percentBase = width / 100;
                        const viewportWidth = width - newBounds[0] * percentBase - (width - newBounds[1] * percentBase);
                        const newBias = (width / viewportWidth) * (newBounds[0] !== bounds[0] ? -1 : 1);

                        setBounds(newBounds);
                        setBias(newBias);
                    }} />
                </div>
            </ChartContext.Provider>
        </div>
    );
};
