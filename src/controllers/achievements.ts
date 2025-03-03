import { Request, Response } from 'express';
import { createAchievement } from '../db/services/achievements';

export const createAchievementHandler = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    await createAchievement({ name, description });
    res.sendStatus(201);
};
