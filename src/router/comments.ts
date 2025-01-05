import { Router } from 'express';
import { authenticateToken } from '../helpers/authenticate';
import { createCommentHandler, getCommentsHandler } from '../controllers/comments';

export default (router: Router) => {
    router.post('/questions/:question/comments', authenticateToken, createCommentHandler);
    router.get('/questions/:question/comments', authenticateToken, getCommentsHandler);
}