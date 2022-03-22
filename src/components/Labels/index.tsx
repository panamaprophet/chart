import styles from './styles.module.css';

interface Props {
    items: string[],
    maxLabelsCount?: number,
}

export const Labels = ({ items = [], maxLabelsCount = 10 }: Props) => {
    return (
        <div className={styles.root}>
            {items && items.map((item, index) => (
                <div className={styles.label} style={{ left: `${index / (items.length / 100)}%` }}>{item}</div>
            ))}
        </div>
    );
}
