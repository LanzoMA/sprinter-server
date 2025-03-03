import { Router } from 'express';
import { createCourseHandler, getCoursesHandler } from '../controllers/courses';
import authenticateToken from '../middleware/authenticate-token';

export default (router: Router) => {
    router.post('/courses', authenticateToken, createCourseHandler);
    router.get('/courses', getCoursesHandler);
};
