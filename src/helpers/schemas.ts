import Joi, { ObjectSchema } from 'joi';

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const registerSchema = Joi.object({
    email: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(8).required(),
});

const questionSchema = Joi.object({
    question: Joi.string().required(),
    markScheme: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    course: Joi.string().required(),
    totalMarks: Joi.number().min(0).max(30).required(),
    author: Joi.string().required(),
});

const ratingSchema = Joi.object({
    difficulty: Joi.number().min(0).max(3).required(),
    marks: Joi.number().min(0).max(100).required(),
});

const achievementSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

const userAchievementSchema = Joi.object({
    user: Joi.string().required(),
    description: Joi.string().required(),
});

export default {
    '/auth/login': loginSchema,
    '/auth/register': registerSchema,
    '/questions': questionSchema,
    '/questions/:id/ratings': ratingSchema,
    '/achievements': achievementSchema,
    '/account/achievements': userAchievementSchema,
} as { [key: string]: ObjectSchema };
