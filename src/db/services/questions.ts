import { SearchQuery } from '../../helpers/models';
import { Question, QuestionDocument, QuestionInput } from '../models/questions';
import { Rating } from '../models/ratings';

const createQuestion = async (question: QuestionInput): Promise<void> => {
    try {
        await new Question(question).save();
    } catch (error) {
        console.error('Error creating question', error);
    }
};

const getQuestionsForUser = async (
    user: string
): Promise<Array<QuestionDocument>> => {
    const questionsCompleted = (
        await Rating.find({ user }, { question: 1 }).exec()
    ).map((rating) => rating.question);

    console.log(questionsCompleted);

    const questions = await Question.find({ _id: { $nin: questionsCompleted } })
        .sort({ createdAt: -1 })
        .exec();

    return questions;
};

const getQuestionById = async (
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
    const match: { [key: string]: any } = {};

    if (searchQuery.course) match['course'] = searchQuery.course;

    const markRange: { [key: string]: number } = {};

    if (searchQuery.minMarks) markRange['$gte'] = searchQuery.minMarks;
    if (searchQuery.maxMarks) markRange['$lte'] = searchQuery.maxMarks;
    if (Object.keys(markRange).length !== 0) match['totalMarks'] = markRange;

    const sort: { [key: string]: any } = {};

    searchQuery.sortBy === 'marks'
        ? (sort['totalMarks'] = -1)
        : (sort['createdAt'] = -1);

    const questions = await Question.find(match).sort(sort).limit(10);

    return questions;
};

const getQuestionsFromUser = async (
    user: string
): Promise<Array<QuestionDocument>> => await Question.find({ author: user });

export {
    createQuestion,
    getQuestionsForUser,
    getQuestionById,
    searchQuestions,
    getQuestionsFromUser,
};
