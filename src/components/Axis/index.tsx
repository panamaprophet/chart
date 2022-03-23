import { getDistributedItems, getLabelPosition } from './helpers';

import styles from './styles.module.css';


interface Props {
    labels: (string | number)[],
    direction: 'vertical' | 'horizontal',
    maxLabelsCount?: number,
}


export const Axis = ({ labels, direction, maxLabelsCount = 4 }: Props) => {
    const renderItems = getDistributedItems(labels, maxLabelsCount);
    const classList = [
        styles.root,
        styles[`root--type-${direction}`]
    ].join(' ');

    return (
        <div className={classList}>
            {renderItems.map((label, index) => (
                <div className={styles.yLabel} style={getLabelPosition(direction, index, renderItems.length)} key={label}>
                    {label}
                </div>
            ))}
        </div>
    );
};
