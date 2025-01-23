import mongoose, { Document, Schema, Model } from 'mongoose';

interface RatingInput {
    userId: string;
    questionId: string;
    difficulty: number;
    marks: number;
}

interface RatingDocument extends Document {
    user: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    difficulty: number;
    marks: number;
    createdAt: Date;
    updatedAt: Date;
}

const ratingSchema: Schema<RatingDocument> = new Schema<RatingDocument>(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        question: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Question',
        },
        difficulty: { type: Number, required: true },
        marks: { type: Number, required: true },
    },
    { timestamps: true }
);

const Rating: Model<RatingDocument> = mongoose.model('Rating', ratingSchema);

export { Rating, RatingInput };
