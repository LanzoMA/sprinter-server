import { Rating, RatingInput } from '../models/ratings';

export const createRating = async (rating: RatingInput) => {
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
