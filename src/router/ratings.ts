import { Router } from 'express';
import authenticateToken from '../middleware/authenticate-token';
import schemaValidator from '../middleware/schemaValidator';
import {
    createRatingHandler,
    getDailyStreakHandler,
} from '../controllers/ratings';

export default (router: Router) => {
    router.post(
        '/questions/:id/ratings',
        schemaValidator('/questions/:id/ratings'),
        authenticateToken,
        createRatingHandler
    );
    router.get(
        '/account/daily-streak',
        authenticateToken,
        getDailyStreakHandler
    );
};
