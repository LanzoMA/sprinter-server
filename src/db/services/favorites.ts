import { Favorite, FavoriteInput } from '../models/favorites';

const createFavorite = async (favorite: FavoriteInput) => {
    const existingFavorite = await Favorite.findOne(favorite);

    if (existingFavorite) {
        throw new Error('Question already favorited');
    }

    await new Favorite(favorite).save();
};

export { createFavorite };
