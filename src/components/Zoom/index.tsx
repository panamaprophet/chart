import { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css';


type TargetBound = 'left' | 'right';

interface Props {
    onBoundsChange: (left: number, right: number) => void,
}


export const Zoom = ({ onBoundsChange }: Props) => {
    const [isMoving, setIsMoving] = useState(false);
    const [targetBound, setTargetBound] = useState<TargetBound>();
    const [leftBoundPosition, setLeftBoundPosition] = useState(0);
    const [rightBoundPosition, setRightBoundPosition] = useState(100);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onDragStart = (target: TargetBound) => { 
        setIsMoving(true);
        setTargetBound(target);
    };

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            const containerWidth = containerRef.current?.clientWidth || 0;
            let position = event.clientX / (containerWidth / 100);

            if (position > 100) {
                position = 100;
            }

            if (position < 0) {
                position = 0;
            }

            if (targetBound === 'left' && position > rightBoundPosition) {
                position = rightBoundPosition;
            }

            if (targetBound === 'right' && position < leftBoundPosition) {
                position = leftBoundPosition;
            }

            if (targetBound === 'left') {
                setLeftBoundPosition(position);
                onBoundsChange(position, rightBoundPosition);
            }

            if (targetBound === 'right') {
                setRightBoundPosition(position);
                onBoundsChange(leftBoundPosition, position);
            }
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
        <div className={styles.root} ref={containerRef}>
            <div className={styles.leftBound} style={{ left: `${leftBoundPosition}%` }} onMouseDown={() => onDragStart('left')}>L</div>
            <div className={styles.rightBound} style={{ left: `${rightBoundPosition}%` }} onMouseDown={() => onDragStart('right')}>R</div>
        </div>
    );
};
