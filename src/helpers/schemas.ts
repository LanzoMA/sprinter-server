import Joi, { ObjectSchema } from 'joi';

const questionSchema = Joi.object({
    question: Joi.string().required(),
    markScheme: Joi.string().required(),
    title: Joi.string().required(),
    course: Joi.string().required(),
    totalMarks: Joi.number().min(0).max(30).required(),
    author: Joi.string().required(),
});

export default {
    '/questions': questionSchema,
} as { [key: string]: ObjectSchema };
