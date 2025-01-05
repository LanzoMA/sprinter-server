import { Router } from 'express';
import users from './users';
import questions from './questions';
import comments from './comments';

const router: Router = Router();

export default (): Router => {
    users(router);
    questions(router);
    comments(router);
    return router;
};
