import {
    UserAchievement,
    UserAchievementInput,
} from '../models/user-achievements';

const createUserAchievement = async (userAchievement: UserAchievementInput) => {
    await new UserAchievement(userAchievement).save();
};

export { createUserAchievement };
