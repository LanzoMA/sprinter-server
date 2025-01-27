import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.sendStatus(403);
        return;
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (error, user) => {
            if (error) {
                res.sendStatus(403);
                return;
            }

            req.body.user = user;
            next();
        }
    );
};

export default authenticateToken;
