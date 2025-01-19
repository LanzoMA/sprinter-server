import mongoose, { Schema } from "mongoose";

interface QuestionInput {
    question: string;
    markScheme: string;
    title: string;
    description: string;
    course: string;
    totalMarks: number;
    author: string;
}

const questionSchema = new Schema({
    question: { type: String, required: true },
    markScheme: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String },
    totalMarks: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
});

const Question = mongoose.model('Question', questionSchema);

export { Question, QuestionInput };
