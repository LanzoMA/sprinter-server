import mongoose, { Schema, Document, Model } from 'mongoose';

interface QuestionInput {
    question: string;
    markScheme: string;
    title: string;
    description: string;
    course: string;
    totalMarks: number;
    author: string;
}

interface QuestionDocument extends Document {
    question: string;
    markScheme: string;
    title: string;
    description: string;
    course: string;
    totalMarks: number;
    author: string;
}

const questionSchema = new Schema(
    {
        question: { type: String, required: true },
        markScheme: { type: String, required: true },
        course: { type: Schema.Types.ObjectId, required: true },
        title: { type: String, required: true },
        description: { type: String, default: '' },
        totalMarks: { type: Number, required: true },
        author: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

const Question: Model<QuestionDocument> = mongoose.model<QuestionDocument>(
    'Question',
    questionSchema
);

export { Question, QuestionInput, QuestionDocument };
