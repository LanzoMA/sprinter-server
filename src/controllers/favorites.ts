import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import {
    createFavorite,
    deleteFavorite,
    doesFavoriteExist,
    getQuestionFavoriteCount,
} from '../db/services/favorites';

export const createFavoriteHandler = async (req: Request, res: Response) => {
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

export const isFavorited = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user: UserToken = req.body.user;
    const { id } = req.params;

    try {
        const isFavorited = await doesFavoriteExist(user.id, id);
        res.json({ isFavorited });
    } catch (error) {
        console.error(error);
    }
};

export const getQuestionFavoriteCountHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;
    const count = await getQuestionFavoriteCount(id);
    res.json({ count });
};

export const deleteFavoriteHandler = async (req: Request, res: Response) => {
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
