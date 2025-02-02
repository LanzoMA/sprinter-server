import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import {
    createUser,
    deleteUser,
    getUserByEmail,
    getUserCourses,
    updateUserCourses,
    updateUserEmail,
    updateUserPassword,
} from '../db/services/users';
import { getAccessToken } from '../helpers/authenticate';
import { UserToken } from '../db/models/users';

const register = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await createUser({
            email,
            username,
            password: hashedPassword,
        });

        const accessToken = getAccessToken(user.id, user.email, user.username);

        res.status(201).json({ accessToken });
    } catch (error: any) {
        if (error.code === 11000) {
            const keys = Object.keys(error.keyValue);

            if (keys.includes('email')) {
                res.status(400).json({
                    error: 'Account already registered with this email',
                });
                return;
            }

            if (keys.includes('username')) {
                res.status(400).json({ error: 'Username already taken' });
                return;
            }
        }

        res.status(500).send('Something went wrong. Please try again later.');
    }
};

const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

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

        const accessToken = getAccessToken(user.id, user.email, user.username);

        res.json({
            accessToken,
        });
    } catch (error) {
        console.error(error);
    }
};

const updateEmail = async (req: Request, res: Response): Promise<void> => {
    const user: UserToken = req.body.user;
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

        const accessToken = getAccessToken(user.id, email, user.username);

        res.status(201).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating user email');
    }
};

const updatePassword = async (req: Request, res: Response): Promise<void> => {
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

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body.user;

    try {
        await deleteUser(email);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error deleting user');
    }
};

const getUserCoursesHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userToken: UserToken = req.body.user;
    const courses = await getUserCourses(userToken.id);
    res.json(courses);
};

const updateUserCoursesHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userToken: UserToken = req.body.user;
    const courses: Array<string> = req.body.courses;

    await updateUserCourses(userToken.id, courses);
    res.sendStatus(200);
};

export {
    register,
    login,
    updateEmail,
    updatePassword,
    deleteAccount,
    getUserCoursesHandler,
    updateUserCoursesHandler,
};
