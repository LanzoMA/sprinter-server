import { Request, Response } from 'express';
import { createAchievement } from '../db/services/achievements';

export const createAchievementHandler = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400).send('Name/description fields were not given.');
        return;
    }

    try {
        await createAchievement({ name, description });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
