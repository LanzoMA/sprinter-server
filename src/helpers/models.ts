interface SearchQuery {
    course?: string;
    difficulty?: string;
    minMarks?: number;
    maxMarks?: number;
    sortBy?: string;
}

interface IDate {
    year: number;
    month: number;
    day: number;
}

const getCurrentDate = (): IDate => {
    const date = new Date();

    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
    };
};

const convertDate = (date: Date): IDate => {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
    };
};

const isSameDate = (firstDate: IDate, secondDate: IDate): boolean => {
    return (
        firstDate.year === secondDate.year &&
        firstDate.month === secondDate.month &&
        firstDate.day === secondDate.day
    );
};

export { SearchQuery, IDate, getCurrentDate, convertDate, isSameDate };
