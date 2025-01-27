import { Rating, RatingInput } from '../models/ratings';

export const createRating = async (rating: RatingInput) => {
    await new Rating({
        user: rating.user,
        question: rating.question,
        difficulty: rating.difficulty,
        marks: rating.marks,
    }).save();
};
