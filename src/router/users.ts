import { Router } from 'express';
import {
    deleteAccount,
    login,
    register,
    updateEmail,
    updatePassword,
} from '../controllers/users';
import authenticateToken from '../middleware/authenticate-token';
import schemaValidator from '../middleware/schemaValidator';

export default (router: Router): void => {
    router.post('/register', register);
    router.post('/login', schemaValidator('/auth/login'), login);
    router.put('/account/email', authenticateToken, updateEmail);
    router.put('/account/password', authenticateToken, updatePassword);
    router.delete('/account', authenticateToken, deleteAccount);
};
