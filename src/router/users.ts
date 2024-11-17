import { Router } from "express";
import { register } from "../controllers/users";

export default (router: Router): void => {
    router.post('/register', register);
};
