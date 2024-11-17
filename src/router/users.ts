import { Router } from "express";
import { login, register } from "../controllers/users";

export default (router: Router): void => {
    router.post('/register', register);
    router.post('/login', login);
};
