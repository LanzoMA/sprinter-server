import { User, UserInput, UserToken } from '../models/users';

export const createUser = async (user: UserInput): Promise<UserToken> => {
    const document = await new User(user).save();

    return {
        id: document._id as string,
        email: document.email,
        username: document.username,
    };
};

export const getUserDetailsById = async (id: string) => {
    const user = await User.findById(id);

    if (!user) throw new Error('User not found');

    return {
        username: user.username,
        description: user.description,
        profilePicture: user.profilePicture,
    };
};

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email }).exec();

    if (!user) throw Error('User not found');

    return {
        id: user._id as string,
        email: user.email,
        username: user.username,
        password: user.password,
    };
};

export const updateUserEmailById = async (
    id: string,
    email: string
): Promise<void> => {
    await User.findByIdAndUpdate(id, { email }).exec();
};

export const updateUserPasswordById = async (
    id: string,
    password: string
): Promise<void> => {
    await User.findByIdAndUpdate(id, { password }).exec();
};

export const deleteUserById = async (id: string): Promise<void> => {
    await User.findByIdAndDelete(id).exec();
};

export const getUserCourses = async (id: string) =>
    await User.findById(id, { courses: 1 }).populate('courses');

export const updateUserCourses = async (id: string, courses: Array<string>) => {
    await User.findByIdAndUpdate(id, { $set: { courses } });
};

export const updateProfile = async (
    id: string,
    username: string,
    description: string,
    profilePicture: string
): Promise<void> => {
    await User.findByIdAndUpdate(id, { username, description, profilePicture });
};
