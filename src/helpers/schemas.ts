import Joi, { ObjectSchema } from 'joi';

const questionSchema = Joi.object({
    question: Joi.string().required(),
    markScheme: Joi.string().required(),
    title: Joi.string().required(),
    course: Joi.string().required(),
    totalMarks: Joi.number().min(0).max(30).required(),
    author: Joi.string().required(),
});

const searchSchema = Joi.object({
    course: Joi.string().required(),
    difficulty: Joi.string().required(),
    minMarks: Joi.number().required(),
    maxMarks: Joi.number().required(),
    sortBy: Joi.string().required(),
});

export default {
    '/questions': questionSchema,
    '/questions/search': searchSchema,
} as { [key: string]: ObjectSchema };
