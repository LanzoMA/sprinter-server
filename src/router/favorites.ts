import { Router } from 'express';
import authenticateToken from '../middleware/authenticate-token';
import {
    createFavoriteHandler,
    deleteFavoriteHandler,
} from '../controllers/favorites';

export default (router: Router) => {
    router.post(
        '/questions/:id/favorites',
        authenticateToken,
        createFavoriteHandler
    );
    router.delete(
        '/questions/:id/favorites',
        authenticateToken,
        deleteFavoriteHandler
    );
};
