import { SearchQuery } from '../../helpers/models';
import { Question, QuestionDocument, QuestionInput } from '../models/questions';
import { Rating } from '../models/ratings';
import { getUserCourses } from './users';

export const createQuestion = async (
    question: QuestionInput
): Promise<void> => {
    await new Question(question).save();
};

export const getQuestionsForUser = async (
    user: string
): Promise<Array<QuestionDocument>> => {
    const userCourseData = await getUserCourses(user);

    if (!userCourseData) throw new Error('No user courses found');

    const userCourses = userCourseData.courses;

    const questionsCompleted = (
        await Rating.find({ user }, { question: 1 }).exec()
    ).map((rating) => rating.question);

    const questions = await Question.aggregate([
        {
            $match: {
                _id: { $nin: questionsCompleted },
                course: { $in: userCourses },
            },
        },
        { $sample: { size: 10 } },
        { $project: { __v: 0, createdAt: 0, updatedAt: 0, course: 0 } },
    ]).exec();

    return questions;
};

export const getQuestionById = async (
    id: string
): Promise<QuestionDocument | null> => await Question.findById(id);

export const searchQuestions = async (
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

export const getQuestionsFromUser = async (
    user: string
): Promise<Array<QuestionDocument>> => await Question.find({ author: user });
