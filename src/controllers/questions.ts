import { Request, Response } from 'express';
import { createQuestion } from '../db/services/questions';

export const createQuestionHandler = async (req: Request, res: Response): Promise<void> => {
    const { question, markScheme, title, description, course, totalMarks, author } = req.body;

    if (!question || !markScheme || !title || !description || !course || !totalMarks || !author) {
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

export const getQuestionByIdHandler = async (req: Response, res: Response): Promise<void> => {

};

export const deleteQuestionById = async (req: Response, res: Response): Promise<void> => {

};

