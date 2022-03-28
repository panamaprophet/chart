import styles from './styles.module.css';


interface Props {
    labels: (string | number)[],
    direction: 'vertical' | 'horizontal',
    coordinates: (number | string)[],
}


export const Axis = ({ labels, direction, coordinates }: Props) => {
    const classList = [
        styles.root,
        styles[`root--type-${direction}`]
    ].join(' ');

    return (
        <div className={classList}>
            {labels.map((label, index) => ( // @todo: do not render elements outside of the viewport
                <div className={styles.yLabel} style={{ [direction === 'horizontal' ? 'left' : 'bottom']: coordinates[index] }} key={label}>
                    {label}
                </div>
            ))}
        </div>
    );
};
