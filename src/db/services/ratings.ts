import { isSameDate, toDateFormat } from '../../helpers/date';
import { Rating, RatingInput } from '../models/ratings';

const createRating = async (rating: RatingInput) => {
    const existingRating = await Rating.findOne({
        user: rating.user,
        question: rating.question,
    }).exec();

    if (existingRating) {
        throw new Error('Rating already exists');
    }

    await new Rating({
        user: rating.user,
        question: rating.question,
        difficulty: rating.difficulty,
        marks: rating.marks,
    }).save();
};

const getDailyStreak = async (user: string): Promise<number> => {
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

export { createRating, getDailyStreak };
