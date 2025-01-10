import mongoose, { Schema, Document, Model } from 'mongoose';

interface CourseInput {
  name: string,
  qualification: string,
  examBoard: string,
}

interface CourseDocument extends Document {
  name: string,
  qualification: string,
  examBoard: string,
}

const courseSchema: Schema<CourseDocument> = new Schema({
  name: { type: String, required: true },
  qualification: { type: String },
  examBoard: { type: String },
});

const Course: Model<CourseDocument> = mongoose.model('Course', courseSchema);

export { Course, CourseInput };