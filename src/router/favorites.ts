import { Router } from 'express';
import authenticateToken from '../middleware/authenticate-token';
import {
    createFavoriteHandler,
    deleteFavoriteHandler,
    getQuestionFavoriteCountHandler,
} from '../controllers/favorites';

export default (router: Router) => {
    router.post(
        '/questions/:id/favorites',
        authenticateToken,
        createFavoriteHandler
    );
    router.get(
        '/questions/:id/favorites',
        authenticateToken,
        getQuestionFavoriteCountHandler
    );
    router.delete(
        '/questions/:id/favorites',
        authenticateToken,
        deleteFavoriteHandler
    );
};
