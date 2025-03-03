import {
    UserAchievement,
    UserAchievementDocument,
    UserAchievementInput,
} from '../models/user-achievements';

export const createUserAchievement = async (
    userAchievement: UserAchievementInput
) => await new UserAchievement(userAchievement).save();

export const getUserAchievements = async (
    user: string
): Promise<Array<UserAchievementDocument> | undefined> =>
    await UserAchievement.find({ user }, { user: 0 })
        .populate('achievement')
        .sort({ createdAt: -1 })
        .exec();
