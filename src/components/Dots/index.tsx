import { MouseEventHandler, useRef, useState } from 'react';
import { getDevicePixelRatio } from '../../helpers';
import { ChartCoordinate } from '../../types';
import { getDotAtCoordinates } from './helpers';

import styles from './styles.module.css';


interface Props {
    values: { [k: string]: (number | string)[] },
    coordinates: { [k: string]: ChartCoordinate[] },
    colors: { [k: string]: string },
}


export const Dots = ({ values, coordinates, colors }: Props) => {
    const [dots, setDots] = useState<[key: string, index: number][]>([]);
    const ref = useRef<HTMLDivElement | null>(null);
    const pixelRatio = getDevicePixelRatio();

    const showDots: MouseEventHandler = (event) => {
        const offset = ref.current?.getBoundingClientRect() ?? { x: 0 };

        setDots(Object.entries(getDotAtCoordinates((event.clientX - offset.x) * pixelRatio, coordinates)));
    };

    const hideDots: MouseEventHandler = () => setDots([]);

    return (
        <div className={styles.root} onMouseOut={hideDots} onMouseMove={showDots} ref={ref}>
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

