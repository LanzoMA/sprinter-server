import mongoose, { Schema, Document, Model } from "mongoose";

interface QuestionInput {
    question: string;
    markScheme: string;
    course: Schema.Types.ObjectId;
    year?: number;
    questionNumber?: number;
    totalMarks: number;
    author: Schema.Types.ObjectId
}

interface QuestionDocument extends Document, QuestionInput {
    averageDifficulty?: number;
    averageMark?: number;
    createdAt: Date;
}

const questionSchema: Schema<QuestionDocument> = new Schema<QuestionDocument>({
    question: { type: String, required: true },
    markScheme: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, required: true },
    year: { type: Number },
    questionNumber: { type: Number },
    totalMarks: { type: Number, required: true },
    averageDifficulty: { type: Number },
    averageMark: { type: Number },
    author: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now(), required: true },
});

const Question: Model<QuestionDocument> = mongoose.model<QuestionDocument>('Question', questionSchema);

export { Question, QuestionInput };
