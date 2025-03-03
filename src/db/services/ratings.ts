import { isSameDate, toDateFormat } from '../../helpers/date';
import { Rating, RatingInput } from '../models/ratings';

export const createRating = async (rating: RatingInput) => {
    const existingRating = await Rating.exists({
        user: rating.user,
        question: rating.question,
    }).exec();

    if (existingRating) throw new Error('Rating already exists');

    await new Rating(rating).save();
};

export const getDailyStreak = async (user: string): Promise<number> => {
    const ratings = await Rating.find({ user }, { _id: 0, createdAt: 1 }).sort({
        createdAt: -1,
    });

    let streak = 0;

    if (ratings.length === 0) return streak;

    // Get the days when the user has been active
    const activeDays: Array<Date> = Array.from(
        new Set(ratings.map((rating) => toDateFormat(rating['createdAt'])))
    ).map((date) => new Date(date));

    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if a streak has begun i.e. they have been activity today or yesterday
    if (
        !isSameDate(today, activeDays[0]) &&
        !isSameDate(yesterday, activeDays[0])
    ) {
        return 0;
    }

    // Get streak starting point
    const current = isSameDate(today, activeDays[0])
        ? new Date(today)
        : new Date(yesterday);

    streak++;
    let end = false;

    // Count the number of continuous days since the starting point
    while (streak < activeDays.length && !end) {
        current.setDate(current.getDate() - 1);
        isSameDate(current, activeDays[streak]) ? streak++ : (end = true);
    }

    return streak;
};

// Calculates the percentage (ranging from 0 to 1) of the marks obtained
// by a user relative to the total possible marks in a course, based on all completed questions.
export const getUserStatisticsForCourse = async (
    user: string,
    course: string
): Promise<number> => {
    const ratings = await Rating.find({ user }).populate({
        path: 'question',
        match: { course },
    });

    const totalMarksAchieved = ratings.reduce(
        (acc, rating) => acc + rating.marks,
        0
    );

    const totalOverallMarks = ratings.reduce(
        (acc, rating) => acc + rating.question.totalMarks,
        0
    );

    return totalMarksAchieved / totalOverallMarks;
};
