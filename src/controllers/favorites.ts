import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import { createFavorite, deleteFavorite } from '../db/services/favorites';

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

const deleteFavoriteHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteFavorite(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

export { createFavoriteHandler, deleteFavoriteHandler };
