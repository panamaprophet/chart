import {useRef, useEffect} from 'react';
import styles from './styles.module.css';

interface ChartDataItem {
  value: number,
  label: string,
}

type ChartCoordinate = [x: number, y: number];

interface Props {
  items: ChartDataItem[],
  width?: number,
  height?: number,
  offset?: number,
}

export const Chart = ({ items, width = 600, height = 300, offset = 2 }: Props) => {
    const canvas = useRef<HTMLCanvasElement|null>(null);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }

        const context = canvas.current.getContext('2d');

        if (!context) {
            return;
        }

        const values = items.map(item => item.value);
        const max = values.reduce((m, i) => Math.max(m, i), values[0]);
        const step = canvas.current.width / values.length;
        const verticalMultiplier = (canvas.current.height - offset) / max;
        const coordinates = values.map<ChartCoordinate>((value, index) => [index * step, value * verticalMultiplier]);

        context.moveTo((coordinates[0][0]), coordinates[0][1]);

        for(let i = 0; i < coordinates.length-1; i ++) {
            const midX = (coordinates[i][0] + coordinates[i + 1][0]) / 2;
            const midY = (coordinates[i][1] + coordinates[i + 1][1]) / 2;
            const controlPointX1 = (midX + coordinates[i][0]) / 2;
            const controlPointX2 = (midX + coordinates[i + 1][0]) / 2;

            context.quadraticCurveTo(
                controlPointX1, 
                coordinates[i][1], 
                midX, 
                midY,
            );

            context.quadraticCurveTo(
                controlPointX2,
                coordinates[i + 1][1], 
                coordinates[i + 1][0], 
                coordinates[i + 1][1],
            );
        }

        context.stroke();

    }, [canvas.current]);

    return (
        <div className={styles.root}>
            <canvas ref={canvas} width={width} height={height}></canvas>
        </div>
    );
}
