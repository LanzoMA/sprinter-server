import { Router } from 'express';
import users from './users';
import questions from './questions';
import comments from './comments';
import courses from './courses';
import achievements from './achievements';
import ratings from './ratings';
import favorites from './favorites';
import userAchievements from './user-achievements';

const router: Router = Router();

export default (): Router => {
    users(router);
    questions(router);
    favorites(router);
    comments(router);
    ratings(router);
    courses(router);
    achievements(router);
    userAchievements(router);
    return router;
};
