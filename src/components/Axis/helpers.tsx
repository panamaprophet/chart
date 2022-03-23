export const getAxisYLabels = (min: number, max: number) => {
    const multiplier = Math.pow(10, max.toString().length - 1) / 2;
    const result = [];

    let i = min;

    while (i < max) {
        result.push(i);

        i += multiplier;
    }

    return result;
};

export const getLabelPosition = (
    direction: 'vertical' | 'horizontal',
    index: number,
    itemsCount: number
) => ({
    [direction === 'vertical' ? 'bottom' : 'left']: `${(index / itemsCount) * 100}%`,
});

export const getDistributedItems = <T,>(items: T[], n: number): T[] => {
    const result = [];
    const interval = Math.floor((items.length  - 2)/(n - 2));

    for (let i = 1; i < n - 1; i++) {
        result.push(items[i * interval]);
    }

    result.unshift(items[0]);
    result.push(items[items.length - 1]);

    return result;
};
