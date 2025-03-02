import { User, UserInput, UserToken } from '../models/users';

export const createUser = async (user: UserInput): Promise<UserToken> => {
    const created = await new User(user).save();

    return {
        id: created._id as string,
        email: created.email,
        username: created.username,
    };
};

export const getUserDetailsById = async (id: string) => {
    const user = await User.findById(id);

    return {
        username: user?.username,
        description: user?.description,
        profilePicture: user?.profilePicture,
    };
};

export const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            console.error('User not found');
            throw Error('User not found');
        }

        return {
            id: user._id as string,
            email: user.email,
            username: user.username,
            password: user.password,
        };
    } catch (error) {
        console.error('Error getting user');
    }
};

export const updateUserEmail = async (
    email: string,
    newEmail: string
): Promise<void> => {
    try {
        await User.updateOne({ email }, { email: newEmail }).exec();
    } catch (error) {
        throw Error('Error updating user email');
    }
};

export const updateUserPassword = async (
    email: string,
    password: string
): Promise<void> => {
    try {
        await User.updateOne({ email }, { password }).exec();
    } catch (error) {
        throw Error('Error updating password');
    }
};

export const deleteUser = async (email: string): Promise<void> => {
    try {
        await User.deleteOne({ email }).exec();
    } catch (error) {
        throw Error('Error deleting user');
    }
};

export const getUserCourses = async (id: string) => {
    return await User.findById(id, { courses: 1 }).populate('courses');
};

export const updateUserCourses = async (id: string, courses: Array<string>) => {
    await User.findByIdAndUpdate(id, { $set: { courses } });
};

export const getProfilePicture = async (
    id: string
): Promise<string | undefined> => {
    const profilePicture = await User.findById(id, {
        profilePicture: 1,
    }).exec();
    return profilePicture?.profilePicture;
};

export const updateProfilePicture = async (
    id: string,
    profilePicture: string
): Promise<void> => {
    await User.findByIdAndUpdate(id, { profilePicture });
};
