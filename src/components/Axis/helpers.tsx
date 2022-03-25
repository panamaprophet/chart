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
