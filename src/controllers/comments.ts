import { Request, Response } from 'express';
import { createComment, getComments } from '../db/services/comments';

export const createCommentHandler = async (req: Request, res: Response) => {
    const user = req.body.user;
    const question = req.params.question;
    const { comment } = req.body;

    if (!comment) {
        res.status(400).send('No comment given');
        return;
    }

    try {
        await createComment({ userId: user.id, questionId: question, comment });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export const getCommentsHandler = async (req: Request, res: Response) => {
    const question = req.params.question;

    try {
        const comments = await getComments(question);
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}