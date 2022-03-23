import styles from './styles.module.css';


interface Props {
    items: string[],
}


export const Labels = ({ items = [] }: Props) => {
    return (
        <div className={styles.root}>
            {items && items.map((item, index) => (
                <div
                    className={styles.label}
                    style={{ left: `${index / (items.length / 100)}%` }}
                    key={item}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};
