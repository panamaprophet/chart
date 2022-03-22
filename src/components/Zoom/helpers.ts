export const getPositionInBounds = (position: number, min = 0, max = 100) => {
    if (position > max) {
        return max;
    }

    if (position < min) {
        return min;
    }

    return position;
};
