import { Router } from 'express';
import { authenticateToken } from '../helpers/authenticate';
import {
    createQuestionHandler,
    getQuestionByIdHandler,
    searchQuestionsHandler,
} from '../controllers/questions';
import { validateSearchQuery } from '../middleware/schemaValidator';

export default (router: Router): void => {
    router.post('/questions', authenticateToken, createQuestionHandler);
    router.get(
        '/questions/search',
        validateSearchQuery,
        searchQuestionsHandler
    );
    router.get('/questions/:id', getQuestionByIdHandler);
};
