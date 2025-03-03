import { Router } from 'express';
import {
    deleteAccount,
    getProfilePictureHandler,
    getUserCoursesHandler,
    getUserDetailsHandler,
    login,
    register,
    updateEmail,
    updatePassword,
    updateProfileHandler,
    updateProfilePictureHandler,
    updateUserCoursesHandler,
} from '../controllers/users';
import authenticateToken from '../middleware/authenticate-token';
import schemaValidator from '../middleware/schemaValidator';
import { getQuestionsFromUserHandler } from '../controllers/questions';

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
    router.put(
        '/account/profile-picture',
        schemaValidator('/account/profile-picture'),
        authenticateToken,
        updateProfilePictureHandler
    );
    router.get('/users/:id/questions', getQuestionsFromUserHandler);
    router.get('/users/:id', getUserDetailsHandler);
    router.put(
        '/users/:id',
        schemaValidator('/users/:id'),
        updateProfileHandler
    );
};
