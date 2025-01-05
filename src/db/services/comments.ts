import { Comment, CommentInput } from "../models/comments";

export const createComment = async (comment: CommentInput) => await new Comment(comment).save();
export const getComments = async (question: string) => await Comment.find({ question }).exec();