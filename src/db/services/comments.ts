import { Comment, CommentInput } from '../models/comments';

export const createComment = async (comment: CommentInput) => {
    await new Comment({
        user: comment.userId,
        question: comment.questionId,
        comment: comment.comment,
    }).save();
};

export const getComments = async (question: string) =>
    await Comment.find({ question })
        .populate({
            path: 'user',
            select: '-email -password -courses -createdAt -updatedAt -__v',
        })
        .exec();
