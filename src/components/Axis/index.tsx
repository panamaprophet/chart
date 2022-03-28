import styles from './styles.module.css';


type Direction = 'vertical' | 'horizontal';

interface Props {
    labels: (string | number)[],
    direction: Direction,
    coordinates: (number | string)[],
}


const getLabelWidthByDirection = (direction: Direction, labels: (string | number)[]) => {
    if (direction === 'vertical') {
        return 'auto';
    }

    return `${100 / labels.length}%`;
};

const getLabelPositionKeyByDirection = (direction: Direction) => direction === 'vertical' ? 'bottom' : 'left';


export const Axis = ({ labels, direction, coordinates }: Props) => {
    const classList = [
        styles.root,
        styles[`root--type-${direction}`]
    ].join(' ');

    return (
        <div className={classList}>
            {labels.map((label, index) => (
                <div className={styles.label} style={{
                    [getLabelPositionKeyByDirection(direction)]: coordinates[index],
                    width: getLabelWidthByDirection(direction, labels),
                }} key={label}>
                    {label}
                </div>
            ))}
        </div>
    );
};
