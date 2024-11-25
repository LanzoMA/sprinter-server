import { Router } from 'express';
import users from './users';
import questions from './questions';

const router: Router = Router();

export default (): Router => {
    users(router);
    questions(router);
    return router;
};
