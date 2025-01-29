import { Favorite, FavoriteInput } from '../models/favorites';

const createFavorite = async (favorite: FavoriteInput) => {
    const existingFavorite = await Favorite.findOne(favorite);

    if (existingFavorite) {
        throw new Error('Question already favorited');
    }

    await new Favorite(favorite).save();
};

const getQuestionFavoriteCount = async (question: string): Promise<number> => {
    return await Favorite.countDocuments({ question });
};

const deleteFavorite = async (favorite: FavoriteInput) => {
    await Favorite.findOneAndDelete(favorite);
};

export { createFavorite, getQuestionFavoriteCount, deleteFavorite };
