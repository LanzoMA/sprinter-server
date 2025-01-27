import { Request, Response } from 'express';
import { UserToken } from '../db/models/users';
import { createRating } from '../db/services/ratings';

const createRatingHandler = async (req: Request, res: Response) => {
    const user: UserToken = req.body;
    const { id } = req.params;
    const { difficulty, marks } = req.body;

    await createRating({ user: user.id, question: id, difficulty, marks });
    res.sendStatus(201);
};

export { createRatingHandler };
