import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import {
    createRating,
    getDailyStreak,
    getRatingCountForUser,
    getUserStatisticsForCourse,
} from '../db/services/ratings';
import { getCourseTitleById } from '../db/services/courses';
import { getUserCoursesById } from '../db/services/users';
import { createUserAchievement } from '../db/services/user-achievements';

export const createRatingHandler = async (req: Request, res: Response) => {
    const userToken: UserToken = req.body.user;
    const { id } = req.params;
    const { difficulty, marks } = req.body;

    try {
        await createRating({
            user: userToken.id,
            question: id,
            difficulty,
            marks,
        });

        const count = await getRatingCountForUser(userToken.id);

        switch (count) {
            case 1:
                await createUserAchievement({
                    user: userToken.id,
                    achievement: '67cace074fb656742651e944',
                });
                res.json({
                    achievement: {
                        name: 'Getting Started',
                        description: 'Completed 1 question',
                    },
                });
                break;
            case 5:
                await createUserAchievement({
                    user: userToken.id,
                    achievement: '67cace074fb656742651e945',
                });
                res.json({
                    achievement: {
                        name: 'A Rising Star',
                        description: 'Completed 5 questions',
                    },
                });
                break;
            case 10:
                await createUserAchievement({
                    user: userToken.id,
                    achievement: '67cace074fb656742651e946',
                });
                res.json({
                    achievement: {
                        name: 'Walking On Water',
                        description: 'Completed 10 questions',
                    },
                });
                break;
            default:
                res.sendStatus(201);
        }
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
