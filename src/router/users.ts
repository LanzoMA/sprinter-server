import { Router } from "express";
import { login, register, updateEmail } from "../controllers/users";
import { authenticateToken } from "../helpers/authenticate";

export default (router: Router): void => {
    router.post('/register', register);
    router.post('/login', login);
    router.put('/account/email', authenticateToken, updateEmail);
};
