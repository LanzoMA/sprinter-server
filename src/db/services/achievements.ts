import { Achievement, AchievementInput } from '../models/achievements';

export const createAchievement = async (achievement: AchievementInput) => {
    await new Achievement(achievement).save();
};
