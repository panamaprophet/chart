import { useMemo } from 'react';
import { Axis } from '../Axis';
import { Tooltips } from '../Tooltips';
import { Zoom } from '../Zoom';
import { Canvas } from '../Canvas';
import { useChart } from '../../hooks/useChart';
import { getSettings } from './settings';
import { CanvasSize } from '../../types';

import styles from './styles.module.css';


interface Props {
    values: number[][],
    canvas?: Partial<CanvasSize & { lineWidth: number }>,
    children?: JSX.Element | JSX.Element[],
}


export const Chart = (props: Props) => {
    const defaultProps = { width: 600, height: 300, lineWidth: 2 };
    const { width, height } = { ...defaultProps, ...(props.canvas || {}) };
    const { lines, axisX, axisY, tooltips, zoom } = useMemo(() => getSettings(props.children), [props.children]);
    const labels = axisX?.labels || props.values[0].map((_, index) => index);
    const colors = lines.map(line => line.color);
    const lineNames = lines.map(line => line.label);

    const {
        setBounds,
        coordinates,
        startIndex,
        yLabels, yLabelsCoordinates,
        xLabels, xLabelsCoordinates,
    } = useChart(props.values, labels, { width, height });

    const formatLabel = (valueIndex: number, lineIndex: number) => {
        const offset = startIndex > 0 ? startIndex - 1 : 0;
        const value = props.values[lineIndex][valueIndex + offset];
        const line = lineNames[lineIndex];

        const fn = tooltips?.formatLabel;

        return fn ? fn(value, line) : value;
    };

    return (
        <div className={styles.root}>
            {axisY && <div className={styles.axisY}>
                <Axis labels={yLabels} coordinates={yLabelsCoordinates} direction="vertical" />
            </div>}
            {axisX && <div className={styles.axisX}>
                <Axis labels={xLabels} coordinates={xLabelsCoordinates} direction="horizontal" />
            </div>}
            <div className={styles.canvas}>
                <Canvas width={width} height={height} coordinates={coordinates} colors={colors} />
                {tooltips && <Tooltips coordinates={coordinates} colors={colors} formatLabel={formatLabel} />}
            </div>
            {zoom && <div className={styles.zoom}>
                <Zoom onBoundsChange={setBounds} />
            </div>}
        </div>
    );
};
