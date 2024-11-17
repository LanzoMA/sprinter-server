import { User, UserInput } from "../models/users";

export const createUser = async (user: UserInput): Promise<void> => {
    try {
        await new User(user).save();
    } catch (error) {
        throw Error('Error creating user');
    }
};

export const changeUserEmail = async (oldEmail: string, newEmail: string): Promise<void> => {
    try {
        await User.updateOne({ email: oldEmail }, { email: newEmail }).exec();
    } catch (error) {
        throw Error('Error updating user email');
    }
};

export const changeUserPassword = async (email: string, password: string): Promise<void> => {
    try {
        await User.updateOne({ email }, { password }).exec();
    } catch (error) {
        throw Error('Error updateing password');
    }
};

export const deleteUser = async (email: string): Promise<void> => {
    try {
        await User.deleteOne({ email }).exec();
    } catch (error) {
        throw Error('Error deleting user');
    }
};
