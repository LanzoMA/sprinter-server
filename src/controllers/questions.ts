import { Request, Response } from 'express';
import { createQuestion } from '../db/services/questions';

export const createQuestionHandler = async (req: Request, res: Response): Promise<void> => {
    const { question, markScheme, course, year, questionNumber, totalMarks, author } = req.body;

    if (!question || !markScheme || !course || !totalMarks || !author) {
        res.status(400).send('Not all fields were given');
        return;
    }

    await createQuestion({
        question,
        markScheme,
        course,
        year,
        questionNumber,
        totalMarks,
        author,
    });
};

export const getQuestionByIdHandler = async (req: Response, res: Response): Promise<void> => {

};

export const deleteQuestionById = async (req: Response, res: Response): Promise<void> => {

};

