import { Favorite, FavoriteInput } from '../models/favorites';

const createFavorite = async (favorite: FavoriteInput) => {
    await new Favorite(favorite).save();
};

export { createFavorite };
