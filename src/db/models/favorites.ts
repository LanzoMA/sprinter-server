import mongoose, { Document, Schema, Model } from 'mongoose';

interface FavoriteInput {
    user: string;
    question: string;
}

interface FavoriteDocument extends Document {
    user: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const favoriteSchema: Schema<FavoriteDocument> = new Schema<FavoriteDocument>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question',
            required: true,
        },
    },
    { timestamps: true }
);

const Favorite: Model<FavoriteDocument> = mongoose.model<FavoriteDocument>(
    'Favorite',
    favoriteSchema
);

export { Favorite, FavoriteInput };
