import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import {
    createFavorite,
    deleteFavorite,
    getQuestionFavoriteCount,
} from '../db/services/favorites';

const createFavoriteHandler = async (req: Request, res: Response) => {
    const user: UserToken = req.body.user;
    const { id } = req.params;

    try {
        await createFavorite({ user: user.id, question: id });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const getQuestionFavoriteCountHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const count = await getQuestionFavoriteCount(id);

    res.json({ count });
};

const deleteFavoriteHandler = async (req: Request, res: Response) => {
    const user: UserToken = req.body.user;
    const { id } = req.params;

    try {
        await deleteFavorite({ user: user.id, question: id });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

export {
    createFavoriteHandler,
    getQuestionFavoriteCountHandler,
    deleteFavoriteHandler,
};
