import { Question, QuestionInput } from "../models/questions";

export const createQuestion = async (question: QuestionInput): Promise<void> => {
    try {
        await new Question(question).save();
    } catch (error) {
        console.error('Error creating question', error);
    }
};

export const getQuestionById = async (id: string) => {
    try {
        const question = await Question.findById(id);

        if (!question) {
            throw Error('Question not found');
        }

        return {
            _id: question._id,
            question: question.question,
            markScheme: question.markScheme,
            course: question.course,
            year: question.year,
            questionNumber: question.questionNumber,
            totalMarks: question.totalMarks,
            author: question.author,
        };
    } catch (error) {
        console.error('Error getting question:', error);
    }
};
