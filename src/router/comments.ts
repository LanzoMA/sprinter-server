import { Router } from 'express';
import authenticateToken from '../middleware/authenticate-token';
import {
    createCommentHandler,
    getCommentsHandler,
} from '../controllers/comments';

export default (router: Router) => {
    router.post(
        '/questions/:id/comments',
        authenticateToken,
        createCommentHandler
    );
    router.get('/questions/:id/comments', getCommentsHandler);
};
