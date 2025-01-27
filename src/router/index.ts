import { Router } from 'express';
import users from './users';
import questions from './questions';
import comments from './comments';
import courses from './courses';
import achievements from './achievements';
import ratings from './ratings';

const router: Router = Router();

export default (): Router => {
    users(router);
    questions(router);
    comments(router);
    ratings(router);
    courses(router);
    achievements(router);
    return router;
};
