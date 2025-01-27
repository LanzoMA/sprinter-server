import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import { createFavorite } from '../db/services/favorites';

const createFavoriteHandler = async (req: Request, res: Response) => {
    const user: UserToken = req.body.user;
    const question = req.body.question;

    try {
        await createFavorite({ user: user.id, question });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};

export { createFavoriteHandler };
