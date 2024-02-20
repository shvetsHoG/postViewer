export const getPagesCount = (totalPagesCount, limit) => {
    return Math.ceil(totalPagesCount / limit)
}

export const getPagesArray = (totalPagesCount) => {
    const array = [];
    for (let i = 1; i < totalPagesCount + 1; i++) {
        array.push(i);
    }

    return array;
}