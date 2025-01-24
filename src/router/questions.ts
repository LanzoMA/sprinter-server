import { Router } from 'express';
import { authenticateToken } from '../helpers/authenticate';
import {
    createQuestionHandler,
    getQuestionByIdHandler,
} from '../controllers/questions';

export default (router: Router): void => {
    router.post('/questions', authenticateToken, createQuestionHandler);
    router.get('/questions/:id', getQuestionByIdHandler);
};
