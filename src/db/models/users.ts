import mongoose, { Schema, Document, Model } from 'mongoose';

interface UserInput {
    email: string;
    username: string;
    password: string;
}

interface UserToken {
    id: string;
    email: string;
    username: string;
}

interface UserDocument extends Document, UserInput {
    description: string;
    profilePicture?: string;
    courses: [Schema.Types.ObjectId];
    createdAt: Date;
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        description: { type: String, default: '' },
        profilePicture: { type: String, default: '' },
        courses: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
            ref: 'Course',
        },
    },
    { timestamps: true }
);

const User: Model<UserDocument> = mongoose.model<UserDocument>(
    'User',
    userSchema
);

export { User, UserInput, UserToken };
