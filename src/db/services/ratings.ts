import { Rating, RatingInput } from '../models/ratings';

export const createRating = async (rating: RatingInput) => {
    await new Rating({
        user: rating.userId,
        question: rating.questionId,
        difficulty: rating.difficulty,
        marks: rating.marks,
    }).save();
}