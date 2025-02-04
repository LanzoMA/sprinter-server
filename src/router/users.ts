import { Router } from 'express';
import {
    deleteAccount,
    getProfilePictureHandler,
    getUserCoursesHandler,
    login,
    register,
    updateEmail,
    updatePassword,
    updateUserCoursesHandler,
} from '../controllers/users';
import authenticateToken from '../middleware/authenticate-token';
import schemaValidator from '../middleware/schemaValidator';

export default (router: Router): void => {
    router.post('/auth/register', schemaValidator('/auth/register'), register);
    router.post('/auth/login', schemaValidator('/auth/login'), login);
    router.put('/account/email', authenticateToken, updateEmail);
    router.put('/account/password', authenticateToken, updatePassword);
    router.delete('/account', authenticateToken, deleteAccount);
    router.get('/account/courses', authenticateToken, getUserCoursesHandler);
    router.put(
        '/account/courses',
        schemaValidator('/account/courses'),
        authenticateToken,
        updateUserCoursesHandler
    );
    router.get(
        '/account/profile-picture',
        authenticateToken,
        getProfilePictureHandler
    );
};
