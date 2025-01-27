import jwt from 'jsonwebtoken';

export const getAccessToken = (id: string, email: string, username: string) => {
    return jwt.sign(
        { id, email, username },
        process.env.ACCESS_TOKEN_SECRET as string
    );
};
