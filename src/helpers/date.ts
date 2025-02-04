const isSameDate = (firstDate: Date, secondDate: Date): boolean => {
    return toDateFormat(firstDate) === toDateFormat(secondDate);
};

const toDateFormat = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export { isSameDate, toDateFormat };
