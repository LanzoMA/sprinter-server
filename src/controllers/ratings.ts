import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import {
    createRating,
    getDailyStreak,
    getUserStatisticsForCourse,
} from '../db/services/ratings';
import { getCourseTitleById } from '../db/services/courses';
import { getUserCoursesById } from '../db/services/users';

export const createRatingHandler = async (req: Request, res: Response) => {
    const user: UserToken = req.body.user;
    const { id } = req.params;
    const { difficulty, marks } = req.body;

    try {
        await createRating({ user: user.id, question: id, difficulty, marks });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);

        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};

export const getDailyStreakHandler = async (req: Request, res: Response) => {
    const userToken: UserToken = req.body.user;
    const streak = await getDailyStreak(userToken.id);
    res.json({ streak });
};

export const getUserStatisticsForCourseHandler = async (
    req: Request,
    res: Response
) => {
    const userToken: UserToken = req.body.user;
    const courses = await getUserCoursesById(userToken.id);

    const data: Record<string, number> = {};

    try {
        for (let course of courses) {
            const name = await getCourseTitleById(course);

            const statistic = await getUserStatisticsForCourse(
                userToken.id,
                course
            );

            data[name] = statistic;
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};
