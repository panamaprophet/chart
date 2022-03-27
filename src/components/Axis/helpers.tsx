export const getLabelPosition = (
    direction: 'vertical' | 'horizontal',
    index: number,
    itemsCount: number
) => ({
    [direction === 'vertical' ? 'bottom' : 'left']: `${(index / itemsCount) * 100}%`,
});
