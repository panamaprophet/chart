import { MouseEventHandler, useRef, useState } from 'react';
import { getDevicePixelRatio } from '../../helpers';
import { getDotAtCoordinates } from './helpers';
import { Coordinate } from '../../types';

import styles from './styles.module.css';


interface Props {
    coordinates: Coordinate[][],
    colors: string[],
    formatLabel?: (value: number, lineIndex: number) => string,
}


const formatDefault = (arg: number) => arg.toString();

export const Dots = ({ coordinates, colors, formatLabel = formatDefault }: Props) => {
    const [dots, setDots] = useState<(number | null)[]>([]);
    const ref = useRef<HTMLDivElement | null>(null);
    const pixelRatio = getDevicePixelRatio();

    const showDots: MouseEventHandler = (event) => {
        const offset = ref.current?.getBoundingClientRect() ?? { x: 0 };
        const position = (event.clientX - offset.x) * pixelRatio;

        setDots(coordinates.map(line => getDotAtCoordinates(position, line)));
    };

    const hideDots: MouseEventHandler = () => setDots([]);

    return (
        <div className={styles.root} onMouseOut={hideDots} onMouseMove={showDots} ref={ref}>
            {dots.map((dotIndex, lineIndex) => (dotIndex !== null) && (
                <div
                    key={lineIndex}
                    className={styles.dot}
                    style={{
                        top: `${coordinates[lineIndex][dotIndex][1] / pixelRatio}px`,
                        left: `${coordinates[lineIndex][dotIndex][0] / pixelRatio}px`,
                        backgroundColor: colors[lineIndex],
                    }}
                >
                    <div className={styles.dotValue}>{formatLabel(dotIndex, lineIndex)}</div>
                </div>
            ))}
        </div>
    );
};
