import { MouseEventHandler, useContext, useState } from 'react';
import { ChartCoordinate } from '../../types';
import { ChartContext } from '../Chart/context';
import { getDotAtCoordinates } from './helpers';

import styles from './styles.module.css';


interface Props {
    values: { [k: string]: (number | string)[] },
    coordinates: { [k: string]: ChartCoordinate[] },
}


export const Dots = ({ values, coordinates }: Props) => {
    const { canvasOffset, colors, pixelRatio } = useContext(ChartContext);
    const [dots, setDots] = useState<[key: string, index: number][]>([]);

    const showDots: MouseEventHandler = (event) => setDots(Object.entries(getDotAtCoordinates((event.clientX - canvasOffset.x) * pixelRatio, coordinates)));
    const hideDots: MouseEventHandler = () => setDots([]);

    return (
        <div className={styles.root} onMouseOut={hideDots} onMouseMove={showDots}>
            {dots.map(([key, index]) => (
                <div
                    key={key}
                    className={styles.dot}
                    style={{
                        top: `${coordinates[key][index][1] / 2}px`,
                        left: `${coordinates[key][index][0] / 2}px`,
                        backgroundColor: colors[key],
                    }}
                >
                    <div className={styles.dotValue}>
                        {key}: {values[key][index]}
                    </div>
                </div>))}
        </div>
    );
};

