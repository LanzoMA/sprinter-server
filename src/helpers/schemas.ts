import Joi, { ObjectSchema } from 'joi';

const questionSchema = Joi.object({
    question: Joi.string().required(),
    markScheme: Joi.string().required(),
    title: Joi.string().required(),
    course: Joi.string().required(),
    totalMarks: Joi.number().min(0).max(30).required(),
    author: Joi.string().required(),
});

const achievementSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

export default {
    '/questions': questionSchema,
    '/achievements': achievementSchema,
} as { [key: string]: ObjectSchema };
