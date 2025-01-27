import Joi, { ObjectSchema } from 'joi';

const searchSchema = Joi.object({
    course: Joi.string().required(),
    difficulty: Joi.string().required(),
    minMarks: Joi.number().required(),
    maxMarks: Joi.number().required(),
    sortBy: Joi.string().required(),
});

export default {
    '/questions/search': searchSchema,
} as { [key: string]: ObjectSchema };
