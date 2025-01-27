import { Router } from 'express';
import authenticateToken from '../middleware/authenticate-token';
import {
    createQuestionHandler,
    getQuestionByIdHandler,
    searchQuestionsHandler,
} from '../controllers/questions';
import schemaValidator from '../middleware/schemaValidator';

export default (router: Router): void => {
    router.post(
        '/questions',
        schemaValidator('/questions'),
        authenticateToken,
        createQuestionHandler
    );
    router.get('/questions/search', searchQuestionsHandler);
    router.get('/questions/:id', getQuestionByIdHandler);
};
