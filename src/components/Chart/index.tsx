import { useRef, useEffect, useState, useMemo } from 'react';
import { Axis } from '../Axis';
import { Dots } from '../Dots';
import { Zoom } from '../Zoom';
import { getDevicePixelRatio } from '../../helpers';
import { drawSmoothLine, getChartData } from './helpers';

import styles from './styles.module.css';


interface Props {
    lineNames: string[],
    xLabels: string[],
    colors: string[],
    values: number[][],
    canvas?: {
        width: number,
        height: number,
        lineWidth: number,
    },
}

export const Chart = (props: Props) => {
    const { width, height } = props.canvas ?? { width: 600, height: 300, lineWidth: 2 };

    const [bounds, setBounds] = useState([0, 100]);
    const pixelRatio = getDevicePixelRatio();
    const canvas = useRef<HTMLCanvasElement|null>(null);

    const chartData = useMemo(() => getChartData(props.values, props.xLabels, bounds, {
        width: width * pixelRatio,
        height: height * pixelRatio,
    }), [bounds]);

    const { coordinates, values, xLabels, yLabels } = chartData;

    const formatLabel = (valueIndex: number, lineIndex: number) => {
        return `${props.lineNames[lineIndex]}: ${values[lineIndex][valueIndex]}`;
    };

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!context) {
            return;
        }

        context?.clearRect(0, 0, width * pixelRatio, height * pixelRatio);

        coordinates.forEach((line, lineIndex) => drawSmoothLine(context, line, props.colors[lineIndex]));
    }, [canvas.current, coordinates]);

    return (
        <div className={styles.root}>
            <div className={styles.axisY}>
                <Axis labels={yLabels} direction="vertical" />
            </div>
            <div className={styles.axisX}>
                <Axis labels={xLabels} direction="horizontal" />
            </div>
            <div className={styles.canvas}>
                <canvas ref={canvas} width={width * pixelRatio} height={height * pixelRatio} />
                <Dots coordinates={coordinates} colors={props.colors} formatLabel={formatLabel} />
            </div>
            <div className={styles.zoom}>
                <Zoom onBoundsChange={setBounds} />
            </div>
        </div>
    );
};
