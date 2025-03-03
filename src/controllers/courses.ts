import { Request, Response } from 'express';
import { createCourse, getCourses } from '../db/services/courses';

export const createCourseHandler = async (req: Request, res: Response) => {
    const { name, qualification, examBoard } = req.body;
    await createCourse({ name, qualification, examBoard });
    res.sendStatus(201);
};

export const getCoursesHandler = async (req: Request, res: Response) => {
    const courses = await getCourses();
    res.json(courses);
};
