import { SearchQuery } from '../../helpers/models';
import { Question, QuestionDocument, QuestionInput } from '../models/questions';
import { Rating } from '../models/ratings';
import {
    getAverageDifficultyOfQuestion,
    getAverageMarkPercentageOfQuestion,
    getUserStatisticsForCourse,
} from './ratings';
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

    const questions: Array<QuestionDocument> = await Question.aggregate([
        {
            $match: {
                _id: { $nin: questionsCompleted },
                course: { $in: userCourses },
            },
        },
        { $project: { __v: 0, createdAt: 0, updatedAt: 0, course: 0 } },
    ]).exec();

    const filteredQuestions = [];
    const markPercentageDeviation = 0.2;

    for (const question of questions) {
        if (filteredQuestions.length >= 10) break;

        const userMarkPercentage = await getUserStatisticsForCourse(
            user,
            question.course
        );
        const averageMarkPercentage = await getAverageMarkPercentageOfQuestion(
            question.id
        );

        const markPercentageLowerLimit =
            1 - userMarkPercentage - markPercentageDeviation;
        const markPercentageUpperLimit =
            1 - userMarkPercentage + markPercentageDeviation;

        if (averageMarkPercentage < markPercentageLowerLimit) continue;
        if (averageMarkPercentage > markPercentageUpperLimit) continue;

        filteredQuestions.push(question);
    }

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

    let questions = await Question.find(match).sort(sort);

    if (searchQuery.difficulty) {
        const filteredQuestions = [];

        for (const question of questions) {
            const averageDifficulty = await getAverageDifficultyOfQuestion(
                question._id as string
            );

            switch (searchQuery.difficulty) {
                case '0':
                    if (averageDifficulty <= 0.5)
                        filteredQuestions.push(question);
                    break;
                case '1':
                    if (averageDifficulty > 0.5 && averageDifficulty <= 1.5)
                        filteredQuestions.push(question);
                    break;
                case '2':
                    if (averageDifficulty > 1.5 && averageDifficulty <= 2.5)
                        filteredQuestions.push(question);
                    break;
                case '3':
                    if (averageDifficulty > 2.5 && averageDifficulty <= 3.5)
                        filteredQuestions.push(question);
                    break;
                default:
                    throw new Error('Invalid value for difficulty was given');
            }
        }

        questions = filteredQuestions;
    }

    return questions.slice(0, 10);
};

export const getQuestionsFromUser = async (
    user: string
): Promise<Array<QuestionDocument>> => await Question.find({ author: user });
