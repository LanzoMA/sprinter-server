import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { createUser, getUserByEmail, updateUserEmail, updateUserPassword } from '../db/services/users';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        res.status(400).send('Email/username/password not given');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const accessToken = jwt.sign({ email, username }, process.env.ACCESS_TOKEN_SECRET as string);

    try {
        await createUser({ email, username, password: hashedPassword });
        res.json({
            message: 'Successfully created user',
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Account already registered with that email');
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Email/password was not given');
        return;
    }

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            res.status(401).send('Credentials were incorrect');
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.status(401).send('Credentials were incorrect');
            return;
        }

        const accessToken = jwt.sign({ email, username: user.username }, process.env.ACCESS_TOKEN_SECRET as string);

        res.json({
            message: 'Successfully logged in',
            accessToken,
        });
    } catch (error) {
        console.error(error);
    }
};

export const updateEmail = async (req: Request, res: Response): Promise<void> => {
    const user = req.body.user;
    const { email } = req.body;

    if (!email) {
        res.status(400).send('Email was not provided');
        return;
    }

    if (email === user.email) {
        res.status(400).send('New email is the same as the old email');
        return;
    }

    try {
        await updateUserEmail(user.email, email);

        const accessToken = jwt.sign(
            { email, username: user.username },
            process.env.ACCESS_TOKEN_SECRET as string
        );

        res.status(201).json({
            message: 'Successfully changed email',
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating user email');
    }
};

// Todo: Update username controller

export const updatePassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body.user;
    const { password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
        res.status(400).send('User not found');
        return;
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (isPasswordSame) {
        res.status(400).send('New password is the same as the old password');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await updateUserPassword(email, hashedPassword);
        res.status(201).send('Successfully updated password');
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating password');
    }
};

// Todo: Update profile picture controller
// Todo: Update courses controller
// Todo: Update achievements controller
// Todo: Delete account controller