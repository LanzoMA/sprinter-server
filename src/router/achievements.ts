import { Router } from 'express';
import authenticateToken from '../middleware/authenticate-token';
import { createAchievementHandler } from '../controllers/achievements';

export default (router: Router) => {
    router.post('/achievements', authenticateToken, createAchievementHandler);
};
