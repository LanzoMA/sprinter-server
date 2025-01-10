import { Router } from "express";
import { createCourseHandler, getCoursesHandler } from "../controllers/courses";

export default (router: Router) => {
    router.post('/courses', createCourseHandler);
    router.get('/courses', getCoursesHandler);
};