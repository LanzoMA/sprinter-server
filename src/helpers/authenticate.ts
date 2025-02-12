import jwt from 'jsonwebtoken';
import { UserToken } from '../db/models/users';

const getAccessToken = (userToken: UserToken) => {
    return jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET as string);
};

export { getAccessToken };
