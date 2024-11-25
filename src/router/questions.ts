import { Router } from "express";
import { authenticateToken } from "../helpers/authenticate";
import { createQuestionHandler } from "../controllers/questions";

export default (router: Router): void => {
    router.post('/questions', authenticateToken, createQuestionHandler);
};
