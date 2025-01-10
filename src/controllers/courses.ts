import { Request, Response } from 'express';
import { createCourse, getCourses } from '../db/services/courses';

export const createCourseHandler = async (req: Request, res: Response) => {
    const { name, qualification, examBoard } = req.body;

    if (!name || !qualification || !examBoard) {
        res.status(400).send('Name/qualification/examBoard were not all given.');
        return;
    }

    await createCourse({ name, qualification, examBoard });
    res.sendStatus(201);
};

export const getCoursesHandler = async (req: Request, res: Response) => {
    const courses = getCourses();
    res.json(courses);
};