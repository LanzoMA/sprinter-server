import mongoose, { Document, Schema, Model } from 'mongoose';

interface UserAchievementInput {
    user: string;
    achievement: string;
}

interface UserAchievementDocument extends Document {
    user: Schema.Types.ObjectId;
    achievement: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const userAchievementSchema: Schema<UserAchievementDocument> =
    new Schema<UserAchievementDocument>(
        {
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            achievement: {
                type: Schema.Types.ObjectId,
                ref: 'Achievement',
                required: true,
            },
        },
        { timestamps: true }
    );

const UserAchievement: Model<UserAchievementDocument> =
    mongoose.model<UserAchievementDocument>(
        'UserAchievement',
        userAchievementSchema
    );

export { UserAchievement, UserAchievementInput, UserAchievementDocument };
