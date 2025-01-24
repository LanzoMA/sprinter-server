import { Router } from 'express';
import { authenticateToken } from '../helpers/authenticate';
import { createAchievementHandler } from '../controllers/achievements';

export default (router: Router) => {
    router.post('/achievements', authenticateToken, createAchievementHandler);
};
