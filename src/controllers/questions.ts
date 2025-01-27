import { Request, Response } from 'express';
import { createQuestion, getQuestionById } from '../db/services/questions';

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

    if (
        !question ||
        !markScheme ||
        !title ||
        !course ||
        !totalMarks ||
        !author
    ) {
        res.status(400).send('Not all fields were given');
        return;
    }

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
    req: Request,
    res: Response
): Promise<void> => {
    res.send('Success');
};

export const deleteQuestionById = async (
    req: Request,
    res: Response
): Promise<void> => {};
