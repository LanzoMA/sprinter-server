import { Request, Response } from 'express';
import {
    createQuestion,
    getQuestionById,
    getQuestionsForUser,
    getQuestionsFromUser,
    searchQuestions,
} from '../db/services/questions';
import { SearchQuery } from '../helpers/models';
import { UserToken } from '../db/models/users';

export const createQuestionHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {
        question,
        markScheme,
        title,
        description,
        course,
        totalMarks,
        author,
    } = req.body;

    try {
        await createQuestion({
            question,
            markScheme,
            title,
            description,
            course,
            totalMarks,
            author,
        });
        res.sendStatus(201);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(400).send('Error creating question');
    }
};

export const getQuestionsForUserHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userToken: UserToken = req.body.user;
    const questions = await getQuestionsForUser(userToken.id);
    res.json(questions);
};

export const getQuestionByIdHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const question = await getQuestionById(id);
        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};

export const searchQuestionsHandler = async (
    req: Request<{}, {}, {}, SearchQuery>,
    res: Response
): Promise<void> => {
    try {
        const questions = await searchQuestions(req.query);
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

export const deleteQuestionByIdHandler = async (
    req: Request,
    res: Response
): Promise<void> => {};

export const getQuestionsFromUserHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    const questions = await getQuestionsFromUser(id);

    res.json(questions);
};
