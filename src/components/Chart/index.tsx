import { useRef, useEffect } from 'react';
import { Axis } from '../Axis';
import { Dots } from '../Dots';
import { Zoom } from '../Zoom';
import { getDevicePixelRatio } from '../../helpers';
import { drawSmoothLine } from './helpers';
import { useChart } from '../../hooks/useChart';

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
    const defaultProps = { width: 600, height: 300, lineWidth: 2 };
    const { width, height } = { ...defaultProps, ...(props.canvas || {}) };

    const pixelRatio = getDevicePixelRatio();
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const {
        setBounds,
        coordinates,
        startIndex,
        yLabels,
        xLabels,
        yLabelsCoordinates,
        xLabelsCoordinates,
    } = useChart(props.values, props.xLabels, { width, height });

    useEffect(() => {
        const context = canvas.current?.getContext('2d');

        if (!canvas.current || !context) {
            return;
        }

        // console.time('canvas draw');
        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        coordinates.forEach((line, lineIndex) => drawSmoothLine(context, line, props.colors[lineIndex]));
        // console.timeEnd('canvas draw');
    }, [coordinates]);

    const formatLabel = (valueIndex: number, lineIndex: number) => {
        const offset = startIndex > 0 ? startIndex - 1 : 0;

        return `${props.lineNames[lineIndex]}: ${props.values[lineIndex][valueIndex + offset]}`;
    };

    return (
        <div className={styles.root}>
            <div className={styles.axisY}>
                <Axis
                    labels={yLabels}
                    coordinates={yLabelsCoordinates}
                    direction="vertical"
                />
            </div>
            <div className={styles.axisX}>
                <Axis
                    labels={xLabels}
                    coordinates={xLabelsCoordinates}
                    direction="horizontal"
                />
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
