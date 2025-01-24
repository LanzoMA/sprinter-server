import mongoose, { Schema, Document, Model } from 'mongoose';

interface AchievementInput {
    name: string;
    description: string;
}

interface AchievementDocument extends Document {
    name: string;
    description: string;
}

const achievementSchema: Schema<AchievementDocument> =
    new Schema<AchievementDocument>({
        name: { type: String, required: true },
        description: { type: String, required: true },
    });

const Achievement: Model<AchievementDocument> =
    mongoose.model<AchievementDocument>('Achievement', achievementSchema);

export { Achievement, AchievementInput };
