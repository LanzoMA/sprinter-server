import { Router } from 'express';
import schemaValidator from '../middleware/schemaValidator';
import authenticateToken from '../middleware/authenticate-token';
import {
    createUserAchievementHandler,
    getUserAchievementsHandler,
} from '../controllers/user-achievements';

export default (router: Router) => {
    router.post(
        '/account/achievements',
        schemaValidator('/account/achievements'),
        authenticateToken,
        createUserAchievementHandler
    );
    router.get(
        '/account/achievements',
        authenticateToken,
        getUserAchievementsHandler
    );
};
