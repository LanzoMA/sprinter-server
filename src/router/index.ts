import { Router } from 'express';
import users from './users';
import questions from './questions';
import comments from './comments';
import courses from './courses';
import achievements from './achievements';

const router: Router = Router();

export default (): Router => {
    users(router);
    questions(router);
    comments(router);
    courses(router);
    achievements(router);
    return router;
};
