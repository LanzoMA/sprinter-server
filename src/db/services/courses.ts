import { Course, CourseInput } from '../models/courses';

export const createCourse = async (course: CourseInput) =>
    await new Course(course).save();
export const getCourses = async () => await Course.find().exec();
export const getCourseTitleById = async (id: string): Promise<string> => {
    const course = await Course.findById(id);

    if (!course) {
        throw new Error('Course not found');
    }

    return `${course.qualification} ${course.examBoard} ${course.name}`;
};
