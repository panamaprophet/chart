export const getAxisYLabels = (min: number, max: number, count: number) => {
    const result = [];
    let i = min;

    while (i < max) {
        result.push(i);

        i += (max / count);
    }

    return result;
}

export const getLabelPosition = (index: number, itemsCount: number) => ({
    bottom: (index / itemsCount) * 100 + '%',
});
