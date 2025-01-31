import {
    UserAchievement,
    UserAchievementDocument,
    UserAchievementInput,
} from '../models/user-achievements';

const createUserAchievement = async (userAchievement: UserAchievementInput) => {
    await new UserAchievement(userAchievement).save();
};

const getUserAchievements = async (
    user: string
): Promise<Array<UserAchievementDocument> | undefined> => {
    return await UserAchievement.find({ user }, { user: 0 })
        .populate('achievement')
        .sort({ createdAt: -1 })
        .exec();
};

export { createUserAchievement, getUserAchievements };
