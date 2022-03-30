import { MouseEventHandler, useRef, useState } from 'react';
import { getDevicePixelRatio } from '../../helpers';
import { getPointByCoordinates } from './helpers';
import { Coordinate } from '../../types';

import styles from './styles.module.css';


interface Props {
    coordinates: Coordinate[][],
    colors: string[],
    formatLabel: (value: number, lineIndex: number) => number | string,
}


const formatDefault = (arg: number) => arg.toString();

export const Tooltips = ({ coordinates, colors, formatLabel = formatDefault }: Props) => {
    const [tooltips, setTooltips] = useState<(number | null)[]>([]);
    const ref = useRef<HTMLDivElement | null>(null);
    const pixelRatio = getDevicePixelRatio();

    const show: MouseEventHandler = (event) => {
        const offset = ref.current?.getBoundingClientRect() ?? { x: 0 };
        const position = (event.clientX - offset.x) * pixelRatio;

        setTooltips(coordinates.map(line => getPointByCoordinates(position, line)));
    };

    const hide: MouseEventHandler = () => setTooltips([]);

    return (
        <div className={styles.root} onMouseOut={hide} onMouseMove={show} ref={ref}>
            {tooltips.map((dotIndex, lineIndex) => (dotIndex !== null) && (
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
