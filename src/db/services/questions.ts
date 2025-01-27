import { SearchQuery } from '../../helpers/models';
import { Question, QuestionDocument, QuestionInput } from '../models/questions';

export const createQuestion = async (
    question: QuestionInput
): Promise<void> => {
    try {
        await new Question(question).save();
    } catch (error) {
        console.error('Error creating question', error);
    }
};

export const getQuestionById = async (
    id: string
): Promise<QuestionDocument | undefined> => {
    try {
        const question = await Question.findById(id);

        if (!question) {
            throw Error('Question not found');
        }

        return question;
    } catch (error) {
        console.error('Error getting question:', error);
    }
};

const searchQuestions = async (
    searchQuery: SearchQuery
): Promise<Array<QuestionDocument>> => {
    const questions = await Question.find({
        course: searchQuery.course,
        totalMarks: { $gte: searchQuery.minMarks, $lte: searchQuery.maxMarks },
    })
        .sort({ createdAt: -1 })
        .limit(10);

    return questions;
};

export { searchQuestions };
