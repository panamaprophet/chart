import { useRef, useEffect, useState } from 'react';
import { getPositionInBounds } from './helpers';

import styles from './styles.module.css';


type TargetBound = 'left' | 'right';

type Bounds = [left: number, right: number];

interface Props {
    onBoundsChange: (bounds: Bounds) => void,
}


export const Zoom = ({ onBoundsChange }: Props) => {
    const minPosition = 0;
    const maxPosition = 100;

    const [isMoving, setIsMoving] = useState(false);
    const [targetBound, setTargetBound] = useState<TargetBound>();
    const [bounds, setBounds] = useState([minPosition, maxPosition]);
    const [leftBound, rightBound] = bounds;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onDragStart = (target: TargetBound) => {
        setIsMoving(true);
        setTargetBound(target);
    };

    const getSelectedAreaStyles = () => {
        if (!containerRef.current) {
            return { left: 0, right: 0 };
        }

        return {
            left: `${leftBound}%`,
            right: `${maxPosition - rightBound}%`,
        };
    };

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            const containerWidth = containerRef.current?.clientWidth || 0;
            const containerOffset = containerRef.current?.getBoundingClientRect() ?? { x: 0 };
            const relativePosition = (event.clientX - containerOffset.x) / (containerWidth / 100);

            const position = targetBound === 'left'
                ? getPositionInBounds(relativePosition, minPosition, rightBound)
                : getPositionInBounds(relativePosition, leftBound, maxPosition);

            const newBounds: Bounds = targetBound === 'left'
                ? [position, rightBound]
                : [leftBound, position];

            setBounds(newBounds);
            onBoundsChange(newBounds);
        };

        const onMouseUp = () => setIsMoving(false);

        if (isMoving) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [isMoving]);

    return (
        <div className={styles.root}>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.area} style={getSelectedAreaStyles()}></div>
                <div className={styles.leftBound} style={{ left: `${leftBound}%` }} onMouseDown={() => onDragStart('left')}></div>
                <div className={styles.rightBound} style={{ left: `${rightBound}%` }} onMouseDown={() => onDragStart('right')}></div>
            </div>
        </div>
    );
};
