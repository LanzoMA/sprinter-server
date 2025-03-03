import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import {
    createUser,
    deleteUserById,
    getUserByEmail,
    getUserCourses,
    getUserDetailsById,
    updateProfile,
    updateUserCourses,
    updateUserEmailById,
    updateUserPasswordById,
} from '../db/services/users';
import { getAccessToken } from '../helpers/authenticate';
import { UserToken } from '../db/models/users';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userToken = await createUser({
            email,
            username,
            password: hashedPassword,
        });

        const accessToken = getAccessToken(userToken);

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

export const login = async (req: Request, res: Response): Promise<void> => {
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

        const accessToken = getAccessToken({
            id: user.id,
            email: user.email,
            username: user.username,
        });

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
    }
};

export const updateEmail = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user: UserToken = req.body.user;
    const { email } = req.body;

    if (email === user.email) {
        res.status(400).json({
            error: 'New email is the same as the old email',
        });
        return;
    }

    try {
        await updateUserEmailById(user.id, email);

        const accessToken = getAccessToken({
            id: user.id,
            email,
            username: user.username,
        });

        res.status(201).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating user email');
    }
};

export const updatePassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userToken: UserToken = req.body.user;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await updateUserPasswordById(userToken.id, hashedPassword);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating password');
    }
};

export const deleteAccount = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userToken: UserToken = req.body.user;

    try {
        await deleteUserById(userToken.id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error deleting user');
    }
};

export const getUserCoursesHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userToken: UserToken = req.body.user;
    const courses = await getUserCourses(userToken.id);
    res.json(courses);
};

export const updateUserCoursesHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userToken: UserToken = req.body.user;
    const courses: Array<string> = req.body.courses;

    await updateUserCourses(userToken.id, courses);
    res.sendStatus(200);
};

export const getUserDetailsHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const details = await getUserDetailsById(id);
        res.json(details);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

export const updateProfileHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const userToken: UserToken = req.body.user;
    const { username, description, profilePicture } = req.body;

    try {
        await updateProfile(id, username, description, profilePicture);

        const accessToken = getAccessToken({
            id,
            username,
            email: userToken.email,
        });

        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
