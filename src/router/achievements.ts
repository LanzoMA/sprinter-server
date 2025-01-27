import { Router } from 'express';
import authenticateToken from '../middleware/authenticate-token';
import { createAchievementHandler } from '../controllers/achievements';
import schemaValidator from '../middleware/schemaValidator';

export default (router: Router) => {
    router.post(
        '/achievements',
        schemaValidator('/achievements'),
        authenticateToken,
        createAchievementHandler
    );
};
