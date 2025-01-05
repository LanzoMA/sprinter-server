import mongoose, { Document, Schema, Model } from 'mongoose';

interface CommentInput {
    user: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    comment: string;
}

interface CommentDocument extends Document, CommentInput {
    createdAt: Date;
}

const commentSchema: Schema<CommentDocument> = new Schema<CommentDocument>({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    question: { type: Schema.Types.ObjectId, required: true, ref: 'Question' },
    comment: { type: String, required: true },
}, { timestamps: true });

const Comment: Model<CommentDocument> = mongoose.model('Comment', commentSchema);

export { Comment, CommentInput };