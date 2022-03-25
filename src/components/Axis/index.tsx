import { getLabelPosition } from './helpers';

import styles from './styles.module.css';


interface Props {
    labels: (string | number)[],
    direction: 'vertical' | 'horizontal',
    maxLabelsCount?: number,
}


export const Axis = ({ labels, direction, maxLabelsCount = 4 }: Props) => {
    const classList = [
        styles.root,
        styles[`root--type-${direction}`]
    ].join(' ');

    return (
        <div className={classList}>
            {labels.map((label, index) => (
                <div className={styles.yLabel} style={getLabelPosition(direction, index, labels.length)} key={label}>
                    {label}
                </div>
            ))}
        </div>
    );
};
