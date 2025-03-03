import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import {
    createUserAchievement,
    getUserAchievements,
} from '../db/services/user-achievements';

export const createUserAchievementHandler = async (
    req: Request,
    res: Response
) => {
    const userToken: UserToken = req.body.user;
    const achievement: string = req.body.achievement;

    try {
        await createUserAchievement({ user: userToken.id, achievement });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

export const getUserAchievementsHandler = async (
    req: Request,
    res: Response
) => {
    const userToken: UserToken = req.body.user;
    const achievements = await getUserAchievements(userToken.id);
    res.json({ achievements });
};
