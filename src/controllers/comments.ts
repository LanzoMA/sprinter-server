import { Request, Response } from 'express';
import { createComment, getComments } from '../db/services/comments';
import { UserToken } from '../db/models/users';

export const createCommentHandler = async (req: Request, res: Response) => {
    const user: UserToken = req.body.user;
    const { id } = req.params;
    const { comment } = req.body;

    await createComment({ user: user.id, question: id, comment });
    res.sendStatus(201);
};

export const getCommentsHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comments = await getComments(id);
    res.json(comments);
};
