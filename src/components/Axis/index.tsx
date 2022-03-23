import { getAxisYLabels, getLabelPosition } from './helpers';
import styles from './styles.module.css';

interface Props {
    min: number,
    max: number,
}


export const Axis = ({ min = 0, max }: Props) => {
    const labels = getAxisYLabels(min, max);

    return (
        <div className={styles.root}>
            {labels.map((label, index) => (
                <div className={styles.yLabel} style={getLabelPosition(index, labels.length)} key={label}>
                    {label}
                </div>
            ))}
        </div>
    );
};
