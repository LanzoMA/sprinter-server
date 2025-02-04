import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import { createRating, getDailyStreak } from '../db/services/ratings';

const createRatingHandler = async (req: Request, res: Response) => {
    const user: UserToken = req.body.user;
    const { id } = req.params;
    const { difficulty, marks } = req.body;

    try {
        await createRating({ user: user.id, question: id, difficulty, marks });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const getDailyStreakHandler = async (req: Request, res: Response) => {
    const userToken: UserToken = req.body.user;
    const streak = await getDailyStreak(userToken.id);
    res.json({ streak });
};

export { createRatingHandler, getDailyStreakHandler };
