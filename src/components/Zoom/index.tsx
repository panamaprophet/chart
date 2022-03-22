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
            left: `${bounds[0]}%`,
            right: `${maxPosition - bounds[1]}%`,
        };
    };

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            const containerWidth = containerRef.current?.clientWidth || 0;
            const relativePosition = event.clientX / (containerWidth / 100);

            const position = targetBound === 'left'
                ? getPositionInBounds(relativePosition, minPosition, bounds[1])
                : getPositionInBounds(relativePosition, bounds[0], maxPosition);

            const newBounds: Bounds = targetBound === 'left'
                ? [position, bounds[1]]
                : [bounds[0], position];

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
                <div className={styles.leftBound} style={{ left: `${bounds[0]}%` }} onMouseDown={() => onDragStart('left')}></div>
                <div className={styles.rightBound} style={{ left: `${bounds[1]}%` }} onMouseDown={() => onDragStart('right')}></div>
            </div>
        </div>
    );
};
