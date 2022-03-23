import { MouseEventHandler, useContext, useState } from 'react';
import { ChartContext } from '../Chart/context';
import { getDotAtCoordinates } from './helpers';

import styles from './styles.module.css';


export const Dots = () => {
    const { coordinates, values, canvasOffset, colors, pixelRatio } = useContext(ChartContext);
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

