import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createUser } from '../db/services/users';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        res.send('Email/username/password not given');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await createUser({ email, username, password: hashedPassword });
        res.send('Successfully created user');
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};

// Todo: Login controller
// Todo: Update email controller
// Todo: Update username controller
// Todo: Update password controller
// Todo: Update profile picture controller
// Todo: Update courses controller
// Todo: Update achievements controller
// Todo: Sign out controller
// Todo: Delete account controller
