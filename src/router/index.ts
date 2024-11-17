import { Router } from 'express';
import users from './users';

const router: Router = Router();

export default (): Router => {
    users(router);
    return router;
};
