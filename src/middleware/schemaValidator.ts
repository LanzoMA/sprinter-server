import { Request, Response, NextFunction } from 'express';
import schemas from '../helpers/schemas';

const validateSearchQuery = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = schemas['/questions/search'];

    if (!schema) {
        throw new Error('Search schema was not found');
    }

    const { error } = schema.validate(req.query);

    if (error) {
        res.status(422).json({ error: error.details[0].message });
        return;
    }

    next();
};

export { validateSearchQuery };
