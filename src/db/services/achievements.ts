import { Achievement, AchievementInput } from '../models/achievements';

const createAchievement = async (achievement: AchievementInput) =>
    await new Achievement(achievement).save();

export { createAchievement };
