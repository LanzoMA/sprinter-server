import { Favorite, FavoriteInput } from '../models/favorites';

export const createFavorite = async (favorite: FavoriteInput) => {
    const existingFavorite = await Favorite.findOne(favorite);

    if (existingFavorite) throw new Error('Question already favorited');

    await new Favorite(favorite).save();
};

export const doesFavoriteExist = async (
    user: string,
    question: string
): Promise<boolean> => {
    const existingFavorite = await Favorite.exists({ user, question });

    return existingFavorite ? true : false;
};

export const getQuestionFavoriteCount = async (
    question: string
): Promise<number> => await Favorite.countDocuments({ question });

export const deleteFavorite = async (favorite: FavoriteInput) =>
    await Favorite.findOneAndDelete(favorite);
