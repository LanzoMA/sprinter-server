import { Course, CourseInput } from "../models/courses";

export const createCourse = async (course: CourseInput) => await new Course(course).save();
export const getCourses = async () => await Course.find().exec();